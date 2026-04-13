import { NextResponse } from 'next/server';
import { buildPaymentUrl } from '@/lib/icici-pay';
import { supabaseAdmin } from '@/lib/supabase';
import { isIciciDebugEnabled, writeIciciDebugLog } from '@/lib/icici-debug';

const isPaymentDebug = process.env.NODE_ENV !== 'production' || process.env.PAYMENT_DEBUG === '1';

function normalizeBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
  return false;
}

function sanitizePan(value) {
  return String(value ?? '').toUpperCase().replace(/\s+/g, '').trim();
}

function sanitizeAadhar(value) {
  return String(value ?? '').replace(/\s+/g, '').trim();
}

function normalizeAddressType(value) {
  const type = String(value || '').trim();
  if (['Residential', 'Office', 'Factory'].includes(type)) return type;
  return 'Residential';
}

function formatAddressText({ addressLine1, addressLine2, city, state, pinCode, country }) {
  const line1 = String(addressLine1 || '').trim();
  const line2 = String(addressLine2 || '').trim();
  const cityText = String(city || '').trim();
  const stateText = String(state || '').trim();
  const pinText = String(pinCode || '').trim();
  const countryText = String(country || '').trim();

  if (!line1 || !cityText || !stateText || !pinText || !countryText) return '';

  let address = line1;
  if (line2) address += `, ${line2}`;
  if (cityText) address += `, ${cityText}`;
  address += ` - ${stateText} ${pinText}`;
  address += `, ${countryText}`;
  return address;
}

function maskMobile(value) {
  const str = String(value ?? '');
  if (str.length < 4) return '***';
  return `${str.slice(0, 2)}******${str.slice(-2)}`;
}

function maskEmail(value) {
  const str = String(value ?? '');
  const atIndex = str.indexOf('@');
  if (atIndex <= 1) return '***';

  const local = str.slice(0, atIndex);
  const domain = str.slice(atIndex + 1);
  return `${local[0]}***@${domain}`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      amount,
      name,
      mobile,
      email,
      sevaType,
      dedication,
      retryWithAlternateReturnUrl,
      atgRequired,
      panNo,
      aadharNo,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      pinCode,
      addressType,
    } = body;

    // Validate required fields
    if (!amount || !name || !mobile || !email || !sevaType) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, name, mobile, email, sevaType' },
        { status: 400 }
      );
    }

    // Validate amount
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be at least ₹1.' },
        { status: 400 }
      );
    }

    // Validate mobile (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'Mobile number must be exactly 10 digits.' },
        { status: 400 }
      );
    }

    const wants80G = normalizeBoolean(atgRequired);
    const cleanedPan = sanitizePan(panNo);
    const cleanedAadhar = sanitizeAadhar(aadharNo);
    const cleanedAddressType = normalizeAddressType(addressType);
    const addressText = formatAddressText({
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      country,
    });

    if (!addressText) {
      return NextResponse.json(
        { error: 'Please provide a complete address for the receipt.' },
        { status: 400 }
      );
    }

    if (pinCode && !/^\d{6}$/.test(String(pinCode))) {
      return NextResponse.json(
        { error: 'PIN code must be exactly 6 digits.' },
        { status: 400 }
      );
    }

    if (wants80G) {
      if (!cleanedPan && !cleanedAadhar) {
        return NextResponse.json(
          { error: 'PAN or Aadhaar is required for 80G certificate.' },
          { status: 400 }
        );
      }

      if (cleanedPan && !/^[A-Z]{5}\d{4}[A-Z]$/.test(cleanedPan)) {
        return NextResponse.json(
          { error: 'Please enter a valid PAN number.' },
          { status: 400 }
        );
      }

      if (cleanedAadhar && !/^\d{12}$/.test(cleanedAadhar)) {
        return NextResponse.json(
          { error: 'Please enter a valid 12-digit Aadhaar number.' },
          { status: 400 }
        );
      }
    }

    // Build encrypted ICICI payment URL
    const { paymentUrl, refNo, debug, encData, gatewayUrl, merchantId } = buildPaymentUrl({
      amount: numAmount,
      name,
      mobile,
      email,
      sevaType,
      useAlternateReturnUrl: Boolean(retryWithAlternateReturnUrl),
    });

    // Debug logs for gateway verification without exposing full PII.
    if (isPaymentDebug) {
      console.log('[ICICI] Plain mandatory fields:', debug.mandatoryFields, {
        mobile: maskMobile(mobile),
        email: maskEmail(email),
      });
      console.log('[ICICI] Encrypted payload:', debug.encryptedPayload);
      console.log('[ICICI] Payment URL preview:', paymentUrl.slice(0, 100));
    }

    if (isIciciDebugEnabled()) {
      writeIciciDebugLog('pay_api_response', {
        refNo,
        retryWithAlternateReturnUrl: Boolean(retryWithAlternateReturnUrl),
        plainPayload: debug.plainPayload,
        encryptedUrl: paymentUrl,
      });
    }

    const receiptMeta = {
      atg_required: wants80G,
      pan_no: cleanedPan || undefined,
      aadhar_no: cleanedAadhar || undefined,
      separated_address: {
        type: cleanedAddressType,
        address_line_1: String(addressLine1 || '').trim(),
        address_line_2: String(addressLine2 || '').trim() || undefined,
        city: String(city || '').trim(),
        state: String(state || '').trim(),
        country: String(country || '').trim(),
        pin_code: String(pinCode || '').trim(),
      },
      address_text: addressText,
    };

    // Save donation to Supabase as "pending"
    let dbError = null;
    if (!supabaseAdmin) {
      console.error('Supabase admin client is not configured. Skipping donation record insert.');
    } else {
      const insertPayload = {
        ref_no: refNo,
        amount: numAmount,
        name,
        email,
        mobile,
        seva_type: sevaType,
        dedication,
        status: 'pending',
        created_at: new Date().toISOString(),
        receipt_meta: receiptMeta,
        // Legacy schema compatibility (older donations table columns)
        full_name: name,
        phone: mobile,
        payment_status: 'pending',
        payment_reference: refNo,
        payment_gateway: 'ICICI',
        currency: 'INR',
      };

      const insertResult = await supabaseAdmin
        .from('donations')
        .insert([insertPayload]);

      if (insertResult.error) {
        const fallbackPayload = { ...insertPayload };
        delete fallbackPayload.receipt_meta;

        const fallbackResult = await supabaseAdmin
          .from('donations')
          .insert([fallbackPayload]);

        dbError = fallbackResult.error || insertResult.error;
        if (fallbackResult.error) {
          console.error('Database Error (Insert Donation fallback):', fallbackResult.error);
        } else {
          console.warn('Donation inserted without receipt_meta (column missing).');
        }
      } else {
        dbError = null;
      }
    }

    if (dbError) {
      console.error('Database Error (Insert Donation):', dbError);
      // We log the error but still redirect to payment gateway
      // In production, you might want to fail the request if DB insert fails
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      refNo,
      gatewayUrl,
      encData,
      merchantId,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
