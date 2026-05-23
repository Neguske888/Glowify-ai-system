import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://nqpwpzyejgeddudgvuxz.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHdwenllamdlZGR1ZGd2dXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTUyMDYsImV4cCI6MjA5NDc5MTIwNn0.DaO1cfYiMbtfECUygpyoN9lp4VlQc_DbfzVlBCteK64";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAnonInsert() {
  console.log("Testing anonymous insert...");
  try {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    const { data, error } = await supabase.from('profiles').insert({
      id: fakeId,
      email: 'test@example.com',
      full_name: 'Test'
    });
    if (error) {
      console.error("Insert failed:", error.message);
    } else {
      console.log("Insert success!");
    }
    // Cleanup
    await supabase.from('profiles').delete().eq('id', fakeId);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testAnonInsert();
