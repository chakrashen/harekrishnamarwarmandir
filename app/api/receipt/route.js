import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase';

async function findDonationByLookup(lookup) {
  const candidates = [
    { column: 'ref_no', value: lookup },
    { column: 'payment_reference', value: lookup },
    { column: 'txn_id', value: lookup },
  ];

  for (const candidate of candidates) {
    const { data, error } = await supabaseAdmin
      .from('donations')
      .select('ref_no, txn_id, payment_reference, receipt_url, receipt_status, status')
      .eq(candidate.column, candidate.value)
      .maybeSingle();

    if (error) {
      return { data: null, error };
    }

    if (data) {
      return { data, error: null, matchedBy: candidate.column };
    }
  }

  return { data: null, error: null, matchedBy: null };
}

export async function GET(request) {
  const lookup = request.nextUrl.searchParams.get('ref')?.trim();

  if (!lookup) {
    return NextResponse.json({ error: 'Missing ref' }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error, matchedBy } = await findDonationByLookup(lookup);

  if (error) {
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json({
    referenceNo: data.ref_no || null,
    txnId: data.txn_id || null,
    matchedBy,
    receiptUrl: data.receipt_url || null,
    receiptStatus: data.receipt_status || null,
    donationStatus: data.status || null,
  });
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}
