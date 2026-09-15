import { createBrowserClient } from "@supabase/ssr";
import { isValidSupabaseUrl } from "./supabase-config";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!isValidSupabaseUrl(url) || !key) return null;
  return createBrowserClient(url, key);
}
