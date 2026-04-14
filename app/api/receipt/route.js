import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request) {
  const refNo = request.nextUrl.searchParams.get('ref');

  if (!refNo) {
    return NextResponse.json({ error: 'Missing ref' }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('donations')
    .select('receipt_url, receipt_status, status')
    .eq('ref_no', refNo)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json({
    receiptUrl: data.receipt_url || null,
    receiptStatus: data.receipt_status || null,
    donationStatus: data.status || null,
  });
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}
