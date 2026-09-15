import { NextResponse } from "next/server";
import { getAuthenticatedServerClient, getSupabaseAdminClient } from "@/lib/supabase-server";

type NewLeader = { fullName?: string; username?: string; email?: string; password?: string; clubIds?: string[] };

async function requirePrefect() {
  const client = await getAuthenticatedServerClient();
  if (!client) return { response: NextResponse.json({ error: "Supabase is not configured." }, { status: 503 }) };
  const { data: { user } } = await client.auth.getUser();
  if (!user) return { response: NextResponse.json({ error: "You must be signed in." }, { status: 401 }) };
  const { data: profile } = await client.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "prefect") return { response: NextResponse.json({ error: "Only the Clubs Prefect can manage teacher accounts." }, { status: 403 }) };
  const admin = getSupabaseAdminClient();
  if (!admin) return { response: NextResponse.json({ error: "Add SUPABASE_SERVICE_ROLE_KEY to the server environment." }, { status: 503 }) };
  return { client, user, admin };
}

export async function GET() {
  const access = await requirePrefect();
  if ("response" in access) return access.response;
  const { data, error } = await access.admin.from("profiles").select("id,username,login_email,full_name,role,club_leaders(club_id)").order("full_name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data });
}

export async function POST(request: Request) {
  const access = await requirePrefect();
  if ("response" in access) return access.response;
  const body = await request.json() as NewLeader;
  const fullName = body.fullName?.trim(); const username = body.username?.trim().toLowerCase(); const email = body.email?.trim().toLowerCase(); const password = body.password; const clubIds = Array.isArray(body.clubIds) ? body.clubIds : [];
  if (!fullName || !username || !email || !password) return NextResponse.json({ error: "Name, username, email, and password are required." }, { status: 400 });
  if (!/^[a-z0-9][a-z0-9._-]{2,30}$/.test(username)) return NextResponse.json({ error: "Username must be 3–31 lowercase letters, numbers, dots, dashes, or underscores." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  const { data: created, error: createError } = await access.admin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: fullName } });
  if (createError || !created.user) return NextResponse.json({ error: createError?.message || "The teacher account could not be created." }, { status: 400 });
  const { error: profileError } = await access.admin.from("profiles").upsert({ id: created.user.id, username, login_email: email, full_name: fullName, role: "leader" });
  if (profileError) { await access.admin.auth.admin.deleteUser(created.user.id); return NextResponse.json({ error: profileError.message }, { status: 400 }); }
  if (clubIds.length) {
    const { error: assignmentError } = await access.admin.from("club_leaders").insert(clubIds.map((clubId) => ({ user_id: created.user!.id, club_id: clubId })));
    if (assignmentError) return NextResponse.json({ error: `Account created, but assignments failed: ${assignmentError.message}`, userId: created.user.id }, { status: 207 });
  }
  return NextResponse.json({ user: { id: created.user.id, username, email, fullName, clubIds } }, { status: 201 });
}
