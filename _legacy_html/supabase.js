// ═══════════════════════════════════════════
// HARE KRISHNA MARWAR — Supabase Client
// Phase 4 will add Razorpay + PayPal
// ═══════════════════════════════════════════

// TODO: Replace with your Supabase project URL and anon key
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Will be initialized when Supabase CDN is added
let supabase = null;

// Initialize Supabase client
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connected');
    } else {
        console.warn('⚠️ Supabase SDK not loaded yet');
    }
}

// Save donor record
async function saveDonor(donorData) {
    if (!supabase) { console.error('Supabase not initialized'); return null; }
    const { data, error } = await supabase
        .from('donors')
        .insert([donorData])
        .select()
        .single();
    if (error) { console.error('Error saving donor:', error); return null; }
    return data;
}

// Save donation record
async function saveDonation(donationData) {
    if (!supabase) { console.error('Supabase not initialized'); return null; }
    const { data, error } = await supabase
        .from('donations')
        .insert([donationData])
        .select()
        .single();
    if (error) { console.error('Error saving donation:', error); return null; }
    return data;
}

// Save subscriber
async function saveSubscriber(subscriberData) {
    if (!supabase) { console.error('Supabase not initialized'); return null; }
    const { data, error } = await supabase
        .from('subscribers')
        .insert([subscriberData])
        .select()
        .single();
    if (error) { console.error('Error saving subscriber:', error); return null; }
    return data;
}
