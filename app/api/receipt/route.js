import { NextResponse } from 'next/server';

import { createDonationReceipt } from '@/lib/donation-receipt';
import { redactReceiptMeta } from '@/lib/pii';
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
      .select('*')
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

async function ensureReceiptForCompletedDonation(donation) {
  if (!donation || donation.status !== 'completed') {
    return donation;
  }

  if (donation.receipt_url) {
    return donation;
  }

  if (donation.receipt_status && !['failed', 'pending', 'created'].includes(String(donation.receipt_status))) {
    return donation;
  }

  const receiptResponse = await createDonationReceipt({
    donation,
    txnId: donation.txn_id,
    refNo: donation.ref_no,
  });

  if (!receiptResponse?.ok) {
    await supabaseAdmin
      .from('donations')
      .update({
        receipt_status: 'failed',
      })
      .eq('ref_no', donation.ref_no);

    return {
      ...donation,
      receipt_status: 'failed',
    };
  }

  const updatePayload = {
    receipt_id: receiptResponse.receiptId || null,
    receipt_url: receiptResponse.receiptUrl || null,
    receipt_status: 'created',
    receipt_meta: redactReceiptMeta(donation?.receipt_meta) || donation?.receipt_meta || null,
  };

  const updateResult = await supabaseAdmin
    .from('donations')
    .update(updatePayload)
    .eq('ref_no', donation.ref_no);

  if (updateResult.error && updatePayload.receipt_meta) {
    await supabaseAdmin
      .from('donations')
      .update({
        receipt_id: receiptResponse.receiptId || null,
        receipt_url: receiptResponse.receiptUrl || null,
        receipt_status: 'created',
      })
      .eq('ref_no', donation.ref_no);
  }

  return {
    ...donation,
    ...updatePayload,
  };
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

  let resolvedDonation = data;
  if (data.status === 'completed' && !data.receipt_url) {
    try {
      resolvedDonation = await ensureReceiptForCompletedDonation(data);
    } catch {
      resolvedDonation = {
        ...data,
        receipt_status: data.receipt_status || 'failed',
      };
    }
  }

  const response = NextResponse.json({
    referenceNo: resolvedDonation.ref_no || null,
    txnId: resolvedDonation.txn_id || null,
    matchedBy,
    receiptUrl: resolvedDonation.receipt_url || null,
    receiptStatus: resolvedDonation.receipt_status || null,
    donationStatus: resolvedDonation.status || null,
    sevaType: resolvedDonation.seva_type || null,
  });
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}
