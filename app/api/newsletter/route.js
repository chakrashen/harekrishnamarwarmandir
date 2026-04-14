import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map();

function getClientId(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  const ip = forwarded?.split(',')[0]?.trim() || realIp || cfIp || 'unknown';
  return ip;
}

function isRateLimited(clientId) {
  const now = Date.now();
  const existing = rateLimit.get(clientId);

  if (!existing || existing.resetAt <= now) {
    rateLimit.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  if (existing.count > RATE_LIMIT_MAX) return true;

  if (rateLimit.size > 1000) {
    for (const [key, entry] of rateLimit.entries()) {
      if (entry.resetAt <= now) rateLimit.delete(key);
    }
  }

  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const clientId = getClientId(request);
    if (isRateLimited(clientId)) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
    }

    if (!supabaseAdmin) {
      console.warn('Supabase is not configured. Newsletter signup skipped.');
      return NextResponse.json({ error: 'Newsletter is not configured yet.' }, { status: 503 });
    }

    const upsertResult = await supabaseAdmin
      .from('newsletter_subscribers')
      .upsert([{ email }], { onConflict: 'email' });

    if (upsertResult.error) {
      const insertResult = await supabaseAdmin
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (insertResult.error) {
        console.error('Newsletter DB Error:', insertResult.error);
        return NextResponse.json({ error: 'Unable to save your subscription right now.' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
