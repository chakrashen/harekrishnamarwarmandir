import { NextResponse } from 'next/server';
import { buildPaymentUrl } from '@/lib/icici-pay';
import { supabaseAdmin } from '@/lib/supabase';

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
    const { amount, name, mobile, email, sevaType, dedication } = body;

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

    // Build encrypted ICICI payment URL
    const { paymentUrl, refNo, debug } = buildPaymentUrl({
      amount: numAmount,
      name,
      mobile,
      email,
      sevaType,
    });

    // Debug logs for gateway verification without exposing full PII.
    console.log('[ICICI] Plain mandatory fields:', debug.mandatoryFields, {
      mobile: maskMobile(mobile),
      email: maskEmail(email),
    });
    console.log('[ICICI] Encrypted mandatory fields:', debug.encryptedMandatoryFields);
    console.log('[ICICI] Payment URL preview:', paymentUrl.slice(0, 100));

    // Save donation to Supabase as "pending"
    const { error: dbError } = await supabaseAdmin
      .from('donations')
      .insert([
        { 
          ref_no: refNo, 
          amount: numAmount, 
          name, 
          email, 
          mobile, 
          seva_type: sevaType, 
          dedication, 
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Database Error (Insert Donation):', dbError);
      // We log the error but still redirect to payment gateway
      // In production, you might want to fail the request if DB insert fails
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      refNo,
    });
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
