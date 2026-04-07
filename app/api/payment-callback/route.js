import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request) {
  try {
    // ICICI EazyPay sends payment gateway response via POST (often form-urlencoded)
    const formData = await request.formData();
    
    // Convert FormData to object for easier handling
    const data = Object.fromEntries(formData);
    
    console.log('--- ICICI Payment Callback Received ---');
    console.log(data);

    // TODO: The exact response parameter names depend on ICICI's kit
    // Typically, they send back an encrypted string that needs to be decrypted
    // using the AES key to extract status and reference number.
    
    // For now, since we don't have the exact response format structure from the email,
    // we'll safely redirect the user to the thank-you page.
    
    // Dummy extraction (replace with real decryption and parsing logic later)
    // const decryptedData = decrypt(data.ResponseString, process.env.ICICI_AES_KEY);
    // const refNo = decryptedData.split('|')[0];
    // const status = decryptedData.split('|')[something] === 'SUCCESS' ? 'completed' : 'failed';

    // Example of how you would update Supabase once you parse the Reference Number
    /*
    if (refNo) {
      const { data: donation, error } = await supabaseAdmin
        .from('donations')
        .update({ status: status }) // 'completed' or 'failed'
        .eq('ref_no', refNo)
        .select()
        .single();
        
      if (donation && status === 'completed') {
        // Send Thank You Email via Resend
        await resend.emails.send({
          from: 'Hare Krishna Marwar Mandir <onboarding@resend.dev>',
          to: donation.email,
          subject: 'Thank You for Your Donation',
          html: `<h1>Hare Krishna, ${donation.name}!</h1><p>Your donation of ₹${donation.amount} has been successfully received.</p>`
        });
      }
    }
    */

    // Always redirect the user back to the frontend thank-you (or failed) page
    // Using 303 See Other is the correct status code for redirecting from a POST request
    return NextResponse.redirect(new URL('/thank-you', request.url), 303);

  } catch (error) {
    console.error('Payment callback error:', error);
    // Even if it fails, send them back to the site so they aren't stuck on a blank API response
    return NextResponse.redirect(new URL('/', request.url), 303);
  }
}
