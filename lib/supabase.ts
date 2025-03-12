import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvubygrnnhbjokmxdffg.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error("❌ Supabase key is missing! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
