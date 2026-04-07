import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required fields.' }, { status: 400 });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('messages')
      .insert([
        { name, email, phone, subject, message, created_at: new Date().toISOString() }
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      // We will continue to send email even if DB insert fails
    }

    // 2. Send email notification via Resend
    const { error: emailError } = await resend.emails.send({
      from: 'Hare Krishna Marwar Mandir <onboarding@resend.dev>', // Use verified domain in production
      to: 'harekrishna@hkmjodhpur.org', // Send to admin
      subject: `New Contact Request: ${subject || 'No Subject'}`,
      html: `
        <h3>New Contact Request from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (emailError) {
      console.error('Email Error:', emailError);
      // Don't fail the user request if notification email fails.
      // Contact data is already stored in the database.
      return NextResponse.json({
        success: true,
        warning: 'Message saved, but email notification failed.'
      });
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
