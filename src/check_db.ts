import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error("Error:", error.message);
  } else {
    if (data && data.length > 0) {
      console.log("Columns:", Object.keys(data[0]).join(', '));
    } else {
      console.log("No data, but query successful.");
    }
  }
}

check();
