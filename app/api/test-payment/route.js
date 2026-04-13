import { NextResponse } from 'next/server';
import { buildPaymentUrl } from '@/lib/icici-pay';
import { isIciciDebugEnabled, writeIciciDebugLog } from '@/lib/icici-debug';

export async function GET(request) {
  if (!isIciciDebugEnabled()) {
    return NextResponse.json({ error: 'DEBUG_ICICI must be true to use this endpoint.' }, { status: 403 });
  }

  const timestamp = new Date().toISOString();
  const refNo = `TEST_${Date.now()}`;
  const forceAlternate = request.nextUrl.searchParams.get('alt') === '1';

  const { paymentUrl, debug } = buildPaymentUrl({
    amount: 10,
    name: 'Test Donor',
    mobile: '9999999999',
    email: 'test@example.com',
    sevaType: 'Test Seva',
    city: 'Jodhpur',
    state: 'Rajasthan',
    address: 'Test Address Line 1, Test Area',
    pincode: '342001',
    refNoOverride: refNo,
    useAlternateReturnUrl: forceAlternate,
  });

  const plainPayload = {
    ...debug.plainPayload,
    referenceNo: refNo,
  };

  writeIciciDebugLog('test_payment', {
    timestamp,
    plainPayload,
    encryptedUrl: paymentUrl,
  });

  return NextResponse.json({
    plainPayload,
    encryptedUrl: paymentUrl,
    timestamp,
  });
}
