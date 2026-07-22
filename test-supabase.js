const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lfwsvizmqinwbarxhddr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmd3N2aXptcWlud2JhcnhoZGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODA5MzIsImV4cCI6MjA5OTc1NjkzMn0.DDtwn_wIHzUIaovumUrkCBrQJD8-ehbTHb-Ly7ssbkc'
);

async function test() {
  const queries = [
    { name: 'reviews', promise: supabase.from('reviews').select('*').order('sort_order', { ascending: true }).limit(1) },
    { name: 'banners', promise: supabase.from('banners').select('*').order('sort_order', { ascending: true }).limit(1) }
  ];
  
  for (const q of queries) {
    const { data, error } = await q.promise;
    console.log(`--- ${q.name} ---`);
    if (error) console.log('Error:', error.message);
    else console.log('Count:', data.length);
  }
}

test();
