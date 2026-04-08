import crypto from 'crypto';
import { isIciciDebugEnabled, writeIciciDebugLog } from '@/lib/icici-debug';

/**
 * ICICI EazyPay AES-128 ECB Encryption
 * Encrypts payment parameters before redirecting to ICICI gateway.
 * This runs ONLY on the server (API routes) — never exposed to the browser.
 */

const ALGO = 'aes-128-ecb';

function assertIciciConfig({ merchantId, aesKey, subMerchantId, returnUrl }) {
  if (!merchantId || !aesKey || !subMerchantId || !returnUrl) {
    throw new Error('Missing ICICI payment configuration.');
  }

  if (Buffer.from(aesKey, 'utf8').length !== 16) {
    throw new Error('ICICI_AES_KEY must be exactly 16 bytes for AES-128-ECB.');
  }

  // ICICI expects raw return URL before encryption (not pre-encoded).
  if (/%[0-9A-Fa-f]{2}/.test(returnUrl)) {
    throw new Error('ICICI_RETURN_URL appears URL-encoded. Use raw URL before encryption.');
  }
}

function sanitizeMandatoryFieldValue(value) {
  // Prevent delimiter collisions in the pipe-separated mandatory fields format.
  return String(value ?? '').replace(/\|/g, ' ').trim();
}

function formatIciciAmount(amount) {
  const parsed = Number(amount);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error('Invalid amount for ICICI EazyPay.');
  }

  return Number.isInteger(parsed) ? String(parsed) : parsed.toFixed(2);
}

export function encrypt(plainText, key) {
  if (typeof plainText !== 'string') {
    throw new TypeError('encrypt() expects plainText as a string.');
  }

  const cipher = crypto.createCipheriv(ALGO, Buffer.from(key, 'utf8'), null);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  if (process.env.NODE_ENV !== 'production') {
    console.log('[ICICI][encrypt] rawBase64 generated');
  }

  return encrypted;
}

export function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipheriv(ALGO, Buffer.from(key, 'utf8'), null);
  let decrypted = decipher.update(String(encryptedText), 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * Build the ICICI EazyPay encrypted payment URL
 * @param {Object} params - Payment parameters
 * @param {number} params.amount - Transaction amount in INR
 * @param {string} params.name - Payer full name
 * @param {string} params.mobile - 10-digit mobile number
 * @param {string} params.email - Payer email
 * @param {string} params.sevaType - Type of seva (e.g., "Anna Daan Seva")
 * @returns {string} Fully encrypted EazyPay redirect URL
 */
export function buildPaymentUrl({ amount, name, mobile, email, sevaType, refNoOverride, useAlternateReturnUrl = false }) {
  const merchantId = process.env.ICICI_MERCHANT_ID;
  const aesKey = process.env.ICICI_AES_KEY;
  const subMerchantId = process.env.ICICI_SUB_MERCHANT_ID;
  const primaryReturnUrl = process.env.ICICI_RETURN_URL;
  const alternateReturnUrl = process.env.ICICI_ALT_RETURN_URL || 'https://www.harekrishnamarwar.org/';
  const forceAlternate = process.env.ICICI_USE_ALT_RETURN_URL === 'true' || useAlternateReturnUrl;
  const returnUrl = forceAlternate ? alternateReturnUrl : primaryReturnUrl;

  assertIciciConfig({ merchantId, aesKey, subMerchantId, returnUrl });

  // Generate unique reference number: HKM-{timestamp}-{random}
  const refNo = refNoOverride || `HKM${Date.now()}${Math.floor(Math.random() * 1000)}`;

  // Mandatory fields should stay minimal for gateway validation.
  // Format used by ICICI samples: ReferenceNo|SubMerchantId|Amount
  const safeName = sanitizeMandatoryFieldValue(name);
  const safeMobile = sanitizeMandatoryFieldValue(mobile);
  const safeEmail = sanitizeMandatoryFieldValue(email);
  const safeSevaType = sanitizeMandatoryFieldValue(sevaType);
  const amountString = formatIciciAmount(amount);
  const mandatoryFields = `${refNo}|${subMerchantId}|${amountString}`;

  // Optional fields can carry merchant-side metadata (pipe-separated).
  const optionalFields = `${safeMobile}|${safeEmail}|${safeName}|${safeSevaType}`;

  if (isIciciDebugEnabled()) {
    const plainFieldLog = {
      merchantid: String(merchantId),
      'mandatory fields': mandatoryFields,
      'optional fields': optionalFields,
      returnurl: returnUrl,
      'reference no': refNo,
      submerchantid: String(subMerchantId),
      'transaction amount': amountString,
      paymode: '9',
    };

    const plainPayloadUrl = `https://eazypay.icicibank.com/EazyPG?merchantid=${plainFieldLog.merchantid}`
      + `&mandatory fields=${plainFieldLog['mandatory fields']}`
      + `&optional fields=${plainFieldLog['optional fields']}`
      + `&returnurl=${plainFieldLog.returnurl}`
      + `&Reference No=${plainFieldLog['reference no']}`
      + `&submerchantid=${plainFieldLog.submerchantid}`
      + `&transaction amount=${plainFieldLog['transaction amount']}`
      + `&paymode=${plainFieldLog.paymode}`;

    console.log('[ICICI][plain] payload URL:', plainPayloadUrl);
    console.log('[ICICI][plain] fields:', plainFieldLog);
    writeIciciDebugLog('plain_payload', {
      plainPayloadUrl,
      fields: plainFieldLog,
      usedAlternateReturnUrl: forceAlternate,
    });
  }

  // Encrypt each parameter
  const encMandatory = encrypt(mandatoryFields, aesKey);
  const encOptional = encrypt(optionalFields, aesKey);
  const encReturnUrl = encrypt(returnUrl, aesKey);
  const encRefNo = encrypt(refNo, aesKey);
  const encSubMerchantId = encrypt(subMerchantId, aesKey);
  const encAmount = encrypt(amountString, aesKey);
  const encPayMode = encrypt('9', aesKey);

  // Safety check for encryption/decryption integrity.
  if (decrypt(encMandatory, aesKey) !== mandatoryFields) {
    throw new Error('Mandatory fields encryption validation failed.');
  }

  // URL-encode all encrypted values so '+' and '/' survive gateway query parsing.
  const query = [
    ['merchantid', String(merchantId)],
    ['mandatory fields', encMandatory],
    ['optional fields', encOptional],
    ['returnurl', encReturnUrl],
    ['Reference No', encRefNo],
    ['submerchantid', encSubMerchantId],
    ['transaction amount', encAmount],
    ['paymode', encPayMode],
  ]
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const paymentUrl = `https://eazypay.icicibank.com/EazyPG?${query}`;

  if (isIciciDebugEnabled()) {
    console.log('[ICICI][encrypted] payment URL:', paymentUrl);
    writeIciciDebugLog('encrypted_payload', {
      paymentUrl,
      refNo,
      usedAlternateReturnUrl: forceAlternate,
    });
  }

  return {
    paymentUrl,
    refNo,
    debug: {
      mandatoryFields,
      encryptedMandatoryFields: encMandatory,
      optionalFields,
      returnUrl,
      amountString,
      plainPayload: {
        merchantid: String(merchantId),
        mandatoryFields,
        optionalFields,
        returnurl: returnUrl,
        referenceNo: refNo,
        submerchantid: String(subMerchantId),
        transactionAmount: amountString,
        paymode: '9',
      },
    },
  };
}
