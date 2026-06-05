import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
//  Create a .env file at your project root with these keys:
//
//  VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
//  VITE_SUPABASE_ANON_KEY=your-anon-key-here
//
//  Get them from: Supabase Dashboard → Project Settings → API
// ─────────────────────────────────────────────────────────────

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);