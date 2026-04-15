import { isIciciDebugEnabled, writeIciciDebugLog } from '@/lib/icici-debug';
import { decryptSensitiveValue } from '@/lib/pii';

const DEFAULT_TIMEOUT_MS = Number(process.env.DONATION_RECEIPT_TIMEOUT_MS || 10000);
const DEFAULT_MAX_RETRIES = Number(process.env.DONATION_RECEIPT_MAX_RETRIES || 3);
const DEFAULT_ADDRESS_TYPE = 'Residential';
const DEFAULT_PREACHER = 'RJND';
const DEFAULT_COMPANY = 'Hare Krishna Movement Jodhpur';

const isReceiptDebug = process.env.RECEIPT_DEBUG === 'true' || process.env.RECEIPT_DEBUG === '1';

function logReceipt(event, details = {}) {
  if (isReceiptDebug) {
    console.log('[Receipt API]', { event, ...details });
  }

  if (isIciciDebugEnabled()) {
    writeIciciDebugLog(`receipt_${event}`, details);
  }
}

function logReceiptError(event, details = {}) {
  console.error('[Receipt API]', { event, ...details });

  if (isIciciDebugEnabled()) {
    writeIciciDebugLog(`receipt_${event}`, details);
  }
}

function maskValue(value, keepStart = 2, keepEnd = 2) {
  const text = String(value ?? '');
  if (text.length <= keepStart + keepEnd) return '***';
  return `${text.slice(0, keepStart)}***${text.slice(-keepEnd)}`;
}

function maskEmail(email) {
  const text = String(email ?? '');
  const atIndex = text.indexOf('@');
  if (atIndex <= 1) return '***';
  return `${text[0]}***${text.slice(atIndex)}`;
}

function sanitizePan(value) {
  const decrypted = decryptSensitiveValue(value);
  const text = String(decrypted ?? '').toUpperCase().replace(/\s+/g, '');
  return text;
}

function sanitizeAadhar(value) {
  const decrypted = decryptSensitiveValue(value);
  return String(decrypted ?? '').replace(/\s+/g, '');
}

function normalizeReceiptMeta(meta) {
  if (!meta) return {};
  if (typeof meta === 'string') {
    try {
      return JSON.parse(meta);
    } catch {
      return {};
    }
  }
  if (typeof meta === 'object') return meta;
  return {};
}

function normalizeSeparatedAddress(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const addressLine1 = String(raw.address_line_1 || raw.addressLine1 || '').trim();
  const addressLine2 = String(raw.address_line_2 || raw.addressLine2 || '').trim();
  const city = String(raw.city || '').trim();
  const state = String(raw.state || '').trim();
  const country = String(raw.country || '').trim();
  const pinCode = String(raw.pin_code || raw.pinCode || '').trim();
  const type = String(raw.type || DEFAULT_ADDRESS_TYPE).trim() || DEFAULT_ADDRESS_TYPE;

  if (!addressLine1 || !city || !state || !country || !pinCode) return null;

  return {
    type,
    address_line_1: addressLine1,
    address_line_2: addressLine2 || undefined,
    city,
    state,
    country,
    pin_code: pinCode,
  };
}

function buildAddressText(separatedAddress) {
  if (!separatedAddress) return '';
  const line1 = separatedAddress.address_line_1;
  const line2 = separatedAddress.address_line_2;
  const city = separatedAddress.city;
  const state = separatedAddress.state;
  const pin = separatedAddress.pin_code;
  const country = separatedAddress.country;

  let address = line1;
  if (line2) address += `, ${line2}`;
  if (city) address += `, ${city}`;
  if (state || pin) {
    address += ` - ${[state, pin].filter(Boolean).join(' ')}`;
  }
  if (country) address += `, ${country}`;
  return address;
}

function toDateString(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function normalizeAuthHeader(token) {
  if (!token) return '';
  return token.startsWith('token ') ? token : `token ${token}`;
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function postJsonWithRetry(url, payload, { timeoutMs, maxRetries }) {
  let lastError = null;
  const retries = Math.max(1, maxRetries);

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: payload.headers,
        body: payload.body,
      }, timeoutMs);

      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text || null;
      }

      if (response.ok) {
        return { ok: true, status: response.status, data };
      }

      const retryable = response.status >= 500 || response.status === 429;
      lastError = {
        ok: false,
        status: response.status,
        data,
        retryable,
      };

      if (!retryable || attempt === retries) {
        return lastError;
      }
    } catch (error) {
      lastError = {
        ok: false,
        status: null,
        data: error?.message || 'network_error',
        retryable: true,
      };

      if (attempt === retries) {
        return lastError;
      }
    }

    const backoff = 250 * attempt * attempt;
    await new Promise((resolve) => setTimeout(resolve, backoff));
  }

  return lastError || { ok: false, status: null, data: 'unknown_error' };
}

function buildReceiptPayload({ donation, txnId }) {
  const receiptMeta = normalizeReceiptMeta(donation?.receipt_meta);
  const separatedAddress = normalizeSeparatedAddress(receiptMeta.separated_address);
  const addressText = receiptMeta.address_text || buildAddressText(separatedAddress);

  const atgRequired = Boolean(receiptMeta.atg_required);
  const panNo = sanitizePan(receiptMeta.pan_no);
  const aadharNo = sanitizeAadhar(receiptMeta.aadhar_no);

  const preacher = process.env.DONATION_PREACHER || DEFAULT_PREACHER;
  const company = process.env.DONATION_COMPANY || DEFAULT_COMPANY;
  const receiptSeries = process.env.DONATION_RECEIPT_SERIES || '';

  const missing = [];
  if (!donation?.name) missing.push('donor_name');
  if (!donation?.mobile) missing.push('mobile');
  if (!company) missing.push('company');
  if (!donation?.amount) missing.push('amount');
  if (!donation?.seva_type) missing.push('seva_type');
  if (!addressText && !separatedAddress) missing.push('address');
  if (!txnId) missing.push('remarks');

  if (atgRequired && !panNo && !aadharNo) {
    missing.push('pan_or_aadhar');
  }

  if (missing.length) {
    return { ok: false, reason: 'missing_required_fields', missing };
  }

  const payload = {
    donation: {
      donor_name: donation.name,
      preacher,
      payment_method: 'Gateway',
      mobile: donation.mobile,
      company,
      amount: donation.amount,
      seva_type: donation.seva_type,
      atg_required: atgRequired,
      print_remarks_on_receipt: true,
      try_patron_tagging: false,
      remarks: txnId,
      date: toDateString(donation.created_at),
    }
  };

  if (donation.email) payload.donation.email = donation.email;
  if (panNo) payload.donation.pan_no = panNo;
  if (aadharNo) payload.donation.aadhar_no = aadharNo;
  if (receiptSeries) payload.donation.receipt_series = receiptSeries;
  if (addressText) payload.donation.address = addressText;
  if (separatedAddress) payload.donation.separated_address = separatedAddress;

  return { ok: true, payload };
}

export async function createDonationReceipt({ donation, txnId, refNo }) {
  const apiUrl = process.env.DONATION_RECEIPT_API_URL;
  const apiToken = process.env.DONATION_RECEIPT_API_TOKEN;

  if (!apiUrl || !apiToken) {
    logReceipt('skipped_missing_config', {
      refNo,
      hasApiUrl: Boolean(apiUrl),
      hasToken: Boolean(apiToken),
    });
    return { ok: false, reason: 'missing_config' };
  }

  const payloadResult = buildReceiptPayload({ donation, txnId });
  if (!payloadResult.ok) {
    logReceipt('skipped_missing_fields', {
      refNo,
      missing: payloadResult.missing,
      atgRequired: Boolean(donation?.receipt_meta?.atg_required),
    });
    return payloadResult;
  }

  const authHeader = normalizeAuthHeader(apiToken);
  const requestPayload = {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payloadResult.payload),
  };

  const masked = {
    refNo,
    amount: donation?.amount,
    sevaType: donation?.seva_type,
    txnSuffix: txnId ? String(txnId).slice(-6) : '',
    donor: maskValue(donation?.name),
    mobile: maskValue(donation?.mobile),
    email: maskEmail(donation?.email),
    atgRequired: Boolean(payloadResult.payload?.donation?.atg_required),
  };

  logReceipt('request_start', masked);

  const response = await postJsonWithRetry(apiUrl, requestPayload, {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    maxRetries: DEFAULT_MAX_RETRIES,
  });

  if (!response?.ok) {
    logReceiptError('request_failed', {
      ...masked,
      status: response?.status || 'unknown',
      data: response?.data || null,
    });
    return { ok: false, reason: 'request_failed', status: response?.status, data: response?.data };
  }

  const receiptUrl = response.data?.message?.url
    || response.data?.message?.receipt?.url
    || response.data?.receipt_url
    || response.data?.receiptUrl
    || response.data?.url
    || response.data?.receipt?.url
    || null;

  const receiptId = response.data?.message?.receipt?.receipt_id
    || response.data?.message?.receipt?.name
    || response.data?.receipt_id
    || response.data?.receiptId
    || response.data?.receipt?.id
    || null;

  logReceipt('request_success', {
    ...masked,
    receiptUrl: receiptUrl ? maskValue(receiptUrl, 6, 6) : null,
  });

  return {
    ok: true,
    data: response.data,
    receiptUrl,
    receiptId,
  };
}
