import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://nqpwpzyejgeddudgvuxz.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHdwenllamdlZGR1ZGd2dXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTUyMDYsImV4cCI6MjA5NDc5MTIwNn0.DaO1cfYiMbtfECUygpyoN9lp4VlQc_DbfzVlBCteK64";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log("Testing Supabase auth...");
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'demo@glowify.ai',
      password: 'GlowifyDemo123!'
    });
    if (error) {
      console.error("Sign in failed:", error.message);
      
      console.log("Trying to sign up...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'demo@glowify.ai',
        password: 'GlowifyDemo123!'
      });
      if (signUpError) {
        console.error("Sign up failed:", signUpError.message);
      } else {
        console.log("Sign up success:", signUpData);
      }
    } else {
      console.log("Sign in success:", data.session ? "Got session" : "No session");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testAuth();
