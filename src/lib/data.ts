import { createClient } from "@supabase/supabase-js";
import { clubs as demoClubs } from "./types";

export const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getClubs() {
  if (!hasSupabase) return demoClubs;
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await supabase.from("clubs").select("*").order("name");
  return data?.length ? data.map((club) => ({ ...club, color: "blue", icon: "✦", members: 0 })) : demoClubs;
}
