import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqaisyfmkbvdxmuwbels.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xYWlzeWZta2J2ZHhtdXdiZWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjU5NjUsImV4cCI6MjEwNDU0MTk2NX0.bj32IEhWUpsQPwGq--_x8Baq3tqi2tdvfVF5aNjuRyk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data: catData, error: catError } = await supabase
    .from('categories')
    .select('*');
    
  console.log('Categories Error:', catError);
  console.log('Categories Data:', catData);

  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .select('*');
    
  console.log('Products Error:', prodError);
  console.log('Products Data:', prodData);
  
  const { data: marqueeData, error: marqueeError } = await supabase
    .from('marquee')
    .select('*');
    
  console.log('Marquee Error:', marqueeError);
  console.log('Marquee Data:', marqueeData);
}

testFetch();
