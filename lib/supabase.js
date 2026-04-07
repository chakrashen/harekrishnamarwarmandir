import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Export an admin client with service role key to bypass RLS for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
