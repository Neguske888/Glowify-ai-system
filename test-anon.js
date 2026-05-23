import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://nqpwpzyejgeddudgvuxz.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHdwenllamdlZGR1ZGd2dXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTUyMDYsImV4cCI6MjA5NDc5MTIwNn0.DaO1cfYiMbtfECUygpyoN9lp4VlQc_DbfzVlBCteK64";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAnonQuery() {
  console.log("Testing anonymous query...");
  try {
    const { data, error } = await supabase.from('activity_feed').select('*').limit(1);
    if (error) {
      console.error("Query failed:", error.message);
    } else {
      console.log("Query success! Data length:", data ? data.length : 0);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testAnonQuery();
