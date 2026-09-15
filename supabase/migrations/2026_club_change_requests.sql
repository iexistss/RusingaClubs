-- Run this migration if the original schema was already applied.
create table if not exists public.club_change_requests (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  class_year text not null,
  contact text,
  current_club_id uuid references public.clubs(id) on delete set null,
  requested_club_id uuid not null references public.clubs(id) on delete cascade,
  reason text not null,
  school_year text not null default '2026/2027',
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  requested_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);
alter table public.club_change_requests enable row level security;
drop policy if exists "Anyone can submit a club change request" on public.club_change_requests;
create policy "Anyone can submit a club change request" on public.club_change_requests for insert with check (true);
drop policy if exists "Signed-in leaders can view change requests" on public.club_change_requests;
create policy "Signed-in leaders can view change requests" on public.club_change_requests for select to authenticated using (true);
drop policy if exists "Signed-in leaders can review change requests" on public.club_change_requests;
create policy "Signed-in leaders can review change requests" on public.club_change_requests for update to authenticated using (true) with check (true);
