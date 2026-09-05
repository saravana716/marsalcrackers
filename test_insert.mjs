import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gjluyweadovembsdrvdh.supabase.co';
const supabaseKey = 'sb_publishable_hA0mUtOnuyeHpOeird_C3g_GspCHZG_';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testStatuses() {
  const statuses = ['pending', 'Pending', 'PENDING', 'New', 'new', 'Processing', 'processing', 'PROCESSING'];
  
  // 1. Get any customer
  const { data: customer } = await supabase.from('customers').select('id').limit(1).single();
  if (!customer) {
    console.log('No customers found to test with.');
    return;
  }
  
  console.log('Found customer:', customer.id);
  
  for (const status of statuses) {
    console.log('Trying status: ' + status + '...');
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_id: customer.id,
        total_amount: 100,
        status: status,
        notes: 'Test order'
      })
      .select('id')
      .single();
      
    if (error) {
      console.log('Failed for ' + status + ':', error.message);
    } else {
      console.log('SUCCESS for ' + status + '! Order ID:', data.id);
      // Clean up
      await supabase.from('orders').delete().eq('id', data.id);
      return;
    }
  }
}

testStatuses();
