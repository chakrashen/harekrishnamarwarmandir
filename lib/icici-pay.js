import crypto from 'crypto';

/**
 * ICICI EazyPay AES-128 ECB Encryption
 * Encrypts payment parameters before redirecting to ICICI gateway.
 * This runs ONLY on the server (API routes) — never exposed to the browser.
 */

const ALGO = 'aes-128-ecb';

export function encrypt(plainText, key) {
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(key, 'utf8'), null);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

export function decrypt(encryptedText, key) {
  const decipher = crypto.createDecipheriv(ALGO, Buffer.from(key, 'utf8'), null);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
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
export function buildPaymentUrl({ amount, name, mobile, email, sevaType }) {
  const merchantId = process.env.ICICI_MERCHANT_ID;
  const aesKey = process.env.ICICI_AES_KEY;
  const subMerchantId = process.env.ICICI_SUB_MERCHANT_ID;
  const returnUrl = process.env.ICICI_RETURN_URL;

  // Generate unique reference number: HKM-{timestamp}-{random}
  const refNo = `HKM${Date.now()}${Math.floor(Math.random() * 1000)}`;

  // Mandatory fields format: ReferenceNo|SubMerchantId|Amount|PayerName|Mobile|Email|addr|addr|addr|addr
  const mandatoryFields = `${refNo}|${subMerchantId}|${amount}|${name}|${mobile}|${email}|${sevaType}|Jodhpur|Rajasthan|India`;

  // Encrypt each parameter
  const encMandatory = encrypt(mandatoryFields, aesKey);
  const encOptional = '';
  const encReturnUrl = encrypt(returnUrl, aesKey);
  const encRefNo = encrypt(refNo, aesKey);
  const encSubMerchantId = encrypt(subMerchantId, aesKey);
  const encAmount = encrypt(String(amount), aesKey);
  const encPayMode = encrypt('9', aesKey);

  // Build encrypted URL — DO NOT encodeURIComponent the encrypted values!
  // ICICI expects raw base64 characters (+, /, =) exactly as AES outputs them.
  // This matches the sample URL format from ICICI integration kit.
  const paymentUrl = `https://eazypay.icicibank.com/EazyPG?merchantid=${merchantId}`
    + `&mandatory fields=${encMandatory}`
    + `&optional fields=${encOptional}`
    + `&returnurl=${encReturnUrl}`
    + `&Reference No=${encRefNo}`
    + `&submerchantid=${encSubMerchantId}`
    + `&transaction amount=${encAmount}`
    + `&paymode=${encPayMode}`;

  return { paymentUrl, refNo };
}
