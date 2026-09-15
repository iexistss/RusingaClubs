import { createClient } from "@supabase/supabase-js";
import { clubs as demoClubs } from "./types";
import { isValidSupabaseUrl } from "./supabase-config";

export const hasSupabase = isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getClubs() {
  if (!hasSupabase) return demoClubs;
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!isValidSupabaseUrl(url) || !key) return demoClubs;
    const supabase = createClient(url, key);
    const { data } = await supabase.from("clubs").select("*").order("name");
    return data?.length ? data.map((club) => ({ ...club, color: "blue", icon: "✦", members: 0 })) : demoClubs;
  } catch {
    return demoClubs;
  }
}
