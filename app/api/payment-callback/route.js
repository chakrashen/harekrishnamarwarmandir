import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';
import { decrypt } from '@/lib/icici-pay';
import { createDonationReceipt } from '@/lib/donation-receipt';
import { redactReceiptMeta } from '@/lib/pii';

const isPaymentDebug = process.env.PAYMENT_DEBUG === 'true' || process.env.PAYMENT_DEBUG === '1';
const CALLBACK_MAX_AGE_SECONDS = 15 * 60;
const MAX_ENCRYPTED_PAYLOAD_LENGTH = 12000;
const isProduction = process.env.NODE_ENV === 'production';
const allowWeakSignatures = !isProduction && (process.env.ICICI_ALLOW_WEAK_SIGNATURES === 'true' || process.env.ICICI_ALLOW_WEAK_SIGNATURES === '1');
const allowSignatureBypass = !isProduction && (process.env.ICICI_CALLBACK_BYPASS === 'true' || process.env.ICICI_CALLBACK_BYPASS === '1');
const REF_NO_PATTERN = /^HKM\d{10,}$/i;
const KNOWN_STATUS_CODES = new Set(['SUCCESS', 'SUCCESSFUL', 'OK', 'S', 'FAILED', 'FAILURE', 'F', 'PENDING', 'PROCESSING']);

function debugLog(event, details = {}) {
  if (!isPaymentDebug) return;
  console.log('[ICICI callback]', { event, ...details });
}

async function getCallbackPayload(request) {
  let payload = {};

  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      payload = Object.fromEntries(formData);
    } catch {
      payload = {};
    }
  }

  const queryPayload = Object.fromEntries(request.nextUrl.searchParams);
  return { ...queryPayload, ...payload };
}

function getFieldCaseInsensitive(record, keys) {
  const entries = Object.entries(record || {});
  for (const key of keys) {
    const found = entries.find(([k]) => k.toLowerCase() === key.toLowerCase());
    if (found && found[1] != null && String(found[1]).trim() !== '') {
      return String(found[1]).trim();
    }
  }
  return '';
}

function timingSafeEquals(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function verifySignature({ encryptedPayload, signature, secretKey, timestamp, allowWeak }) {
  if (!encryptedPayload || !signature || !secretKey) {
    return { ok: false, method: null, reason: 'missing_signature_inputs' };
  }

  if (timestamp) {
    const now = Math.floor(Date.now() / 1000);
    const ts = Number(timestamp);
    if (!Number.isFinite(ts)) {
      return { ok: false, method: null, reason: 'invalid_timestamp' };
    }
    if (Math.abs(now - ts) > CALLBACK_MAX_AGE_SECONDS) {
      return { ok: false, method: null, reason: 'timestamp_out_of_window' };
    }
  }

  const candidates = [];
  const payloadBase = encryptedPayload;
  const payloadWithTs = timestamp ? `${encryptedPayload}|${timestamp}` : null;

  candidates.push({
    method: 'hmac_sha256_hex',
    value: crypto.createHmac('sha256', secretKey).update(payloadBase).digest('hex')
  });
  candidates.push({
    method: 'hmac_sha256_base64',
    value: crypto.createHmac('sha256', secretKey).update(payloadBase).digest('base64')
  });

  if (payloadWithTs) {
    candidates.push({
      method: 'hmac_sha256_hex_with_timestamp',
      value: crypto.createHmac('sha256', secretKey).update(payloadWithTs).digest('hex')
    });
    candidates.push({
      method: 'hmac_sha256_base64_with_timestamp',
      value: crypto.createHmac('sha256', secretKey).update(payloadWithTs).digest('base64')
    });
  }

  if (allowWeak) {
    candidates.push({
      method: 'sha256_plain_hex',
      value: crypto.createHash('sha256').update(payloadBase).digest('hex')
    });
    candidates.push({
      method: 'sha256_plain_base64',
      value: crypto.createHash('sha256').update(payloadBase).digest('base64')
    });

    if (payloadWithTs) {
      candidates.push({
        method: 'sha256_plain_hex_with_timestamp',
        value: crypto.createHash('sha256').update(payloadWithTs).digest('hex')
      });
      candidates.push({
        method: 'sha256_plain_base64_with_timestamp',
        value: crypto.createHash('sha256').update(payloadWithTs).digest('base64')
      });
    }
  }

  for (const candidate of candidates) {
    const signatureMatch = candidate.value.length === 64
      ? timingSafeEquals(signature.toLowerCase(), candidate.value.toLowerCase())
      : timingSafeEquals(signature, candidate.value);

    if (signatureMatch) {
      return { ok: true, method: candidate.method, reason: null };
    }
  }

  return { ok: false, method: null, reason: 'signature_mismatch' };
}

function decryptPayload(encryptedPayload, aesKey) {
  if (!encryptedPayload || !aesKey) {
    throw new Error('Missing encrypted payload or AES key.');
  }
  return decrypt(encryptedPayload, aesKey);
}

function isKnownStatusCode(value) {
  return KNOWN_STATUS_CODES.has(String(value || '').trim().toUpperCase());
}

function isLikelyAmount(value) {
  const text = String(value || '').trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return false;
  const parsed = Number(text);
  return Number.isFinite(parsed) && parsed > 0 && parsed < 10000000;
}

function parseResponse(decryptedPayload, expectedSubMerchantId) {
  if (!decryptedPayload) {
    throw new Error('Empty decrypted payload.');
  }

  const parts = String(decryptedPayload).split('|').map((part) => String(part).trim());
  if (parts.length < 5) {
    throw new Error('Malformed decrypted payload.');
  }

  const parsed = {
    refNo: parts[0],
    subMerchantId: parts[1],
    amount: parts[2],
    statusCode: parts[3],
    txnId: parts[4],
    rawParts: parts,
    parseMode: 'positional',
  };

  const hasExpectedRefNo = REF_NO_PATTERN.test(parsed.refNo);
  const hasExpectedStatus = isKnownStatusCode(parsed.statusCode);

  if (hasExpectedRefNo && hasExpectedStatus) {
    return parsed;
  }

  const refCandidate = parts.find((part) => REF_NO_PATTERN.test(part));
  const subMerchantCandidate = expectedSubMerchantId
    ? parts.find((part) => String(part) === String(expectedSubMerchantId))
    : null;
  const statusCandidate = parts.find((part) => isKnownStatusCode(part));
  const amountCandidate = parts.find((part) => {
    if (!isLikelyAmount(part)) return false;
    if (subMerchantCandidate && String(part) === String(subMerchantCandidate)) return false;
    return String(part).length <= 7;
  });

  if (refCandidate) parsed.refNo = refCandidate;
  if (subMerchantCandidate) parsed.subMerchantId = subMerchantCandidate;
  if (amountCandidate) parsed.amount = amountCandidate;
  if (statusCandidate) parsed.statusCode = statusCandidate;

  const reservedValues = new Set([
    parsed.refNo,
    parsed.subMerchantId,
    parsed.amount,
    parsed.statusCode,
  ].filter(Boolean).map((value) => String(value)));

  const txnCandidate = parts.find((part) => {
    const text = String(part || '').trim();
    if (!text || reservedValues.has(text)) return false;
    if (REF_NO_PATTERN.test(text)) return false;
    if (isKnownStatusCode(text)) return false;
    return true;
  });

  if (txnCandidate) {
    parsed.txnId = txnCandidate;
  }

  parsed.parseMode = 'heuristic';
  return {
    ...parsed,
  };
}

function validateParsedResponse(parsed, expectedSubMerchantId) {
  if (!parsed?.refNo || !REF_NO_PATTERN.test(parsed.refNo)) {
    return { valid: false, reason: 'invalid_ref_no' };
  }

  const parsedAmount = Number(parsed.amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return { valid: false, reason: 'invalid_amount' };
  }

  if (expectedSubMerchantId && String(parsed.subMerchantId) !== String(expectedSubMerchantId)) {
    return { valid: false, reason: 'submerchant_mismatch' };
  }

  return { valid: true, reason: null };
}

function mapStatus(statusCode) {
  const code = String(statusCode || '').trim().toUpperCase();
  if (['SUCCESS', 'SUCCESSFUL', 'OK', 'S'].includes(code)) return 'completed';
  if (['FAILED', 'FAILURE', 'F'].includes(code)) return 'failed';
  if (['PENDING', 'PROCESSING'].includes(code)) return 'pending';
  return 'unknown';
}

function redirectWithStatus(request, status, refNo) {
  const allowed = new Set(['completed', 'failed', 'pending']);
  const safeStatus = allowed.has(status) ? status : 'failed';
  const url = new URL('/thank-you', request.url);
  url.searchParams.set('status', safeStatus);
  if (refNo) {
    url.searchParams.set('ref', refNo);
  }
  return NextResponse.redirect(url, 303);
}

async function sendReceiptIfNeeded(donation, receiptResponse) {
  if (!resend || !donation?.email) return { ok: false, reason: 'missing_email_or_resend' };

  const receiptUrl = receiptResponse?.receiptUrl || null;
  const attachments = [];

  if (receiptUrl && /^https?:\/\//i.test(receiptUrl)) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000);
      const response = await fetch(receiptUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get('content-type') || 'application/pdf';
        const buffer = Buffer.from(await response.arrayBuffer());
        attachments.push({
          filename: `receipt-${receiptResponse?.receiptId || donation?.ref_no || 'donation'}.pdf`,
          content: buffer,
          contentType,
        });
      }
    } catch (error) {
      debugLog('receipt_attachment_fetch_failed', {
        refNo: donation?.ref_no,
        message: error?.message || 'receipt fetch failed',
      });
    }
  }

  const receiptLinkHtml = receiptUrl
    ? `<p>You can also download your receipt here: <a href="${receiptUrl}">${receiptUrl}</a></p>`
    : '<p>Your receipt is being prepared and will be available shortly.</p>';

  const result = await resend.emails.send({
    from: 'Hare Krishna Marwar Mandir <onboarding@resend.dev>',
    to: donation.email,
    subject: 'Your Donation Receipt - Hare Krishna Marwar Mandir',
    html: `<h1>Hare Krishna, ${donation.name || 'Devotee'}!</h1><p>Your donation of ₹${donation.amount} has been successfully received.</p>${receiptLinkHtml}`,
    attachments,
  });

  return { ok: true, result };
}

async function handleCallback(request) {
  try {
    const payload = await getCallbackPayload(request);

    const encryptedPayload = getFieldCaseInsensitive(payload, [
      'ResponseString',
      'responseString',
      'Response',
      'response',
      'msg',
      'Msg',
      'encdata',
      'encData',
      'EncData',
    ]);

    const signature = getFieldCaseInsensitive(payload, [
      'Signature',
      'signature',
      'SecureHash',
      'securehash',
      'ResponseHash',
      'responsehash',
      'Hash',
      'hash',
      'Checksum',
      'checksum',
    ]);

    const timestamp = getFieldCaseInsensitive(payload, ['timestamp', 'Timestamp', 'ts', 'TS']);
    const secretKey = process.env.ICICI_CALLBACK_SECRET_KEY || process.env.ICICI_SECRET_KEY || process.env.SECRET_KEY;

    const allowUnsignedCallbacks = process.env.ICICI_ALLOW_UNSIGNED_CALLBACKS === 'true';

    if (!encryptedPayload) {
      debugLog('callback_rejected', {
        reason: 'missing_payload',
        keys: Object.keys(payload),
      });
      return redirectWithStatus(request, 'failed');
    }

    if (encryptedPayload.length > MAX_ENCRYPTED_PAYLOAD_LENGTH) {
      debugLog('callback_rejected', { reason: 'payload_too_large', size: encryptedPayload.length });
      return NextResponse.json({ error: 'Payload too large.' }, { status: 403 });
    }

    const canVerify = Boolean(signature && secretKey);
    const verification = allowSignatureBypass
      ? { ok: true, method: 'bypass', reason: null }
      : canVerify
        ? verifySignature({
          encryptedPayload,
          signature,
          secretKey,
          timestamp,
          allowWeak: allowWeakSignatures,
        })
        : { ok: true, method: 'none', reason: 'missing_signature_or_key' };

    if (canVerify && !verification.ok) {
      debugLog('signature_verification_failed', {
        reason: verification.reason,
        hasPayload: Boolean(encryptedPayload),
        hasSignature: Boolean(signature),
        hasTimestamp: Boolean(timestamp),
      });
      if (!allowUnsignedCallbacks) {
        return NextResponse.json({ error: 'Invalid callback signature.' }, { status: 403 });
      }
    }

    debugLog('signature_verification_passed', { method: verification.method });

    let parsed;
    let decrypted = '';
    try {
      decrypted = decryptPayload(encryptedPayload, process.env.ICICI_AES_KEY);
      parsed = parseResponse(decrypted, process.env.ICICI_SUB_MERCHANT_ID);
    } catch (error) {
      debugLog('decrypt_or_parse_failed', { message: error?.message || 'Unknown error' });
      return redirectWithStatus(request, 'failed');
    }

    const refNo = parsed?.refNo;

    const validation = validateParsedResponse(parsed, process.env.ICICI_SUB_MERCHANT_ID);
    if (!validation.valid) {
      debugLog('callback_rejected', {
        reason: validation.reason,
        refNo: parsed.refNo || '(missing)',
      });
      return redirectWithStatus(request, 'failed', refNo);
    }

    const mappedStatus = mapStatus(parsed.statusCode);
    const redirectStatus = mappedStatus === 'unknown' ? 'failed' : mappedStatus;

    if (!supabaseAdmin) {
      debugLog('supabase_not_configured', { refNo: parsed.refNo });
      return redirectWithStatus(request, redirectStatus, refNo);
    }

    const { data: donation, error: fetchError } = await supabaseAdmin
      .from('donations')
      .select('*')
      .eq('ref_no', parsed.refNo)
      .maybeSingle();

    if (fetchError) {
      debugLog('fetch_failed', { refNo: parsed.refNo, message: fetchError.message });
      return redirectWithStatus(request, 'failed', refNo);
    }

    if (!donation) {
      debugLog('donation_not_found', { refNo: parsed.refNo });
      return redirectWithStatus(request, 'failed', refNo);
    }

    if (parsed.txnId) {
      const { data: txnOwner, error: txnFetchError } = await supabaseAdmin
        .from('donations')
        .select('ref_no,status')
        .eq('txn_id', parsed.txnId)
        .limit(1)
        .maybeSingle();

      if (txnFetchError) {
        debugLog('txn_replay_check_failed', {
          refNo: parsed.refNo,
          txnIdSuffix: parsed.txnId.slice(-6),
          message: txnFetchError.message,
        });
        return redirectWithStatus(request, 'failed', refNo);
      }

      if (txnOwner && txnOwner.ref_no !== parsed.refNo) {
        debugLog('replay_detected', {
          refNo: parsed.refNo,
          existingRefNo: txnOwner.ref_no,
          txnIdSuffix: parsed.txnId.slice(-6),
        });
        return redirectWithStatus(request, 'failed', refNo);
      }

      if (txnOwner && txnOwner.ref_no === parsed.refNo) {
        debugLog('duplicate_callback_same_txn', {
          refNo: parsed.refNo,
          txnIdSuffix: parsed.txnId.slice(-6),
        });
        return redirectWithStatus(request, txnOwner.status === 'completed' ? 'completed' : redirectStatus, refNo);
      }
    }

    if (donation.status === 'completed') {
      debugLog('idempotent_skip_already_completed', { refNo: parsed.refNo });
      return redirectWithStatus(request, 'completed', refNo);
    }

    if (donation.status !== 'pending') {
      debugLog('invalid_state_transition_blocked', {
        refNo: parsed.refNo,
        previousStatus: donation.status,
        attemptedStatus: mappedStatus,
      });
      return redirectWithStatus(request, donation.status, refNo);
    }

    if (!['completed', 'failed'].includes(mappedStatus)) {
      debugLog('status_not_updatable', {
        refNo: parsed.refNo,
        mappedStatus,
      });
      return redirectWithStatus(request, redirectStatus, refNo);
    }

    const updatePayload = {
      status: mappedStatus,
      txn_id: parsed.txnId || null,
      gateway_raw_response: encryptedPayload,
      gateway_decrypted_response: decrypted,
      gateway_signature: signature,
      gateway_verification_method: verification.method,
    };

    let updateError = null;
    const primaryUpdate = await supabaseAdmin
      .from('donations')
      .update(updatePayload)
      .eq('ref_no', parsed.refNo);

    updateError = primaryUpdate.error;

    if (updateError) {
      const fallbackUpdate = await supabaseAdmin
        .from('donations')
        .update({
          status: mappedStatus,
          txn_id: parsed.txnId || null,
        })
        .eq('ref_no', parsed.refNo);

      updateError = fallbackUpdate.error;
    }

    if (updateError) {
      debugLog('update_failed', { refNo: parsed.refNo, message: updateError.message });
      return redirectWithStatus(request, 'failed', refNo);
    }

    if (mappedStatus === 'completed') {
      let receiptResponse = null;

      try {
        receiptResponse = await createDonationReceipt({
          donation,
          txnId: parsed.txnId,
          refNo: parsed.refNo,
        });

        if (receiptResponse?.ok) {
          const redactedMeta = redactReceiptMeta(donation?.receipt_meta);
          const updatePayload = {
            receipt_id: receiptResponse.receiptId || null,
            receipt_url: receiptResponse.receiptUrl || null,
            receipt_status: 'created',
            receipt_meta: redactedMeta || donation?.receipt_meta,
          };

          const updateResult = await supabaseAdmin
            .from('donations')
            .update(updatePayload)
            .eq('ref_no', parsed.refNo);

          if (updateResult.error && updatePayload.receipt_meta) {
            await supabaseAdmin
              .from('donations')
              .update({
                receipt_id: receiptResponse.receiptId || null,
                receipt_url: receiptResponse.receiptUrl || null,
                receipt_status: 'created',
              })
              .eq('ref_no', parsed.refNo);
          }

          try {
            await sendReceiptIfNeeded(donation, receiptResponse);
          } catch (mailError) {
            debugLog('receipt_send_failed', { refNo: parsed.refNo, message: mailError?.message || 'mail error' });
          }
        } else {
          await supabaseAdmin
            .from('donations')
            .update({
              receipt_status: 'failed',
            })
            .eq('ref_no', parsed.refNo);
        }
      } catch (receiptError) {
        debugLog('receipt_api_failed', {
          refNo: parsed.refNo,
          message: receiptError?.message || 'receipt error',
        });
      }
    }

    debugLog('callback_processed', {
      refNo: parsed.refNo,
      status: mappedStatus,
      txnIdSuffix: parsed.txnId ? parsed.txnId.slice(-6) : '',
    });

    return redirectWithStatus(request, redirectStatus, refNo);
  } catch (error) {
    debugLog('unhandled_exception', { message: error?.message || 'Unknown error' });
    return redirectWithStatus(request, 'failed');
  }
}

export async function POST(request) {
  return handleCallback(request);
}

export async function GET(request) {
  return handleCallback(request);
}
