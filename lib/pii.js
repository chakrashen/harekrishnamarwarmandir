import crypto from 'crypto';

const PREFIX = 'enc:';
const ALGO = 'aes-256-gcm';
const IV_LENGTH = 12;

let cachedKey = undefined;
let warnedInvalidKey = false;

function normalizeKey(raw) {
  if (!raw) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  if (/^[0-9a-fA-F]{64}$/.test(trimmed)) {
    return Buffer.from(trimmed, 'hex');
  }

  if (/^[A-Za-z0-9+/=]+$/.test(trimmed)) {
    const base64Buf = Buffer.from(trimmed, 'base64');
    if (base64Buf.length === 32) return base64Buf;
  }

  const utf8Buf = Buffer.from(trimmed, 'utf8');
  if (utf8Buf.length === 32) return utf8Buf;

  return null;
}

export function getPiiKey() {
  if (cachedKey !== undefined) return cachedKey;
  const rawKey = process.env.PII_ENCRYPTION_KEY || process.env.DONATION_PII_KEY;
  const key = normalizeKey(rawKey);

  if (!key && rawKey && !warnedInvalidKey) {
    warnedInvalidKey = true;
    console.warn('[PII] Encryption key is invalid. Provide a 32-byte key (hex, base64, or raw).');
  }

  cachedKey = key || null;
  return cachedKey;
}

export function isEncryptedValue(value) {
  return typeof value === 'string' && value.startsWith(PREFIX);
}

export function encryptSensitiveValue(value) {
  if (value == null) return '';
  const text = String(value).trim();
  if (!text) return '';

  const key = getPiiKey();
  if (!key) return text;

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${PREFIX}${iv.toString('base64')}.${ciphertext.toString('base64')}.${tag.toString('base64')}`;
}

export function decryptSensitiveValue(value) {
  if (value == null) return '';
  const text = String(value).trim();
  if (!text) return '';
  if (!isEncryptedValue(text)) return text;

  const key = getPiiKey();
  if (!key) return '';

  const payload = text.slice(PREFIX.length);
  const parts = payload.split('.');
  if (parts.length !== 3) return '';

  try {
    const [ivBase64, cipherBase64, tagBase64] = parts;
    const iv = Buffer.from(ivBase64, 'base64');
    const ciphertext = Buffer.from(cipherBase64, 'base64');
    const tag = Buffer.from(tagBase64, 'base64');

    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plain.toString('utf8');
  } catch (error) {
    console.warn('[PII] Failed to decrypt value.', error?.message || error);
    return '';
  }
}

export function redactReceiptMeta(meta) {
  if (!meta) return meta;
  let normalized = meta;

  if (typeof meta === 'string') {
    try {
      normalized = JSON.parse(meta);
    } catch {
      return meta;
    }
  }

  if (!normalized || typeof normalized !== 'object') return meta;

  const next = { ...normalized };
  if (next.pan_no) next.pan_no = 'redacted';
  if (next.aadhar_no) next.aadhar_no = 'redacted';

  return next;
}
