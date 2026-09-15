-- Add assigned-club access for teachers and the Prefect.
create table if not exists public.club_leaders (
  user_id uuid not null references public.profiles(id) on delete cascade,
  club_id uuid not null references public.clubs(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (user_id, club_id)
);

alter table public.club_leaders enable row level security;

create or replace function public.is_prefect()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'prefect');
$$;

create or replace function public.can_manage_club(target_club_id uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select public.is_prefect() or exists (select 1 from public.club_leaders where user_id = auth.uid() and club_id = target_club_id);
$$;

drop policy if exists "Signed-in leaders can view students" on public.students;
create policy "Signed-in leaders can view students" on public.students for select to authenticated using (public.is_prefect() or exists (select 1 from public.registrations r join public.club_leaders cl on cl.club_id = r.club_id where r.student_id = students.id and cl.user_id = auth.uid()));
drop policy if exists "Signed-in leaders can view registrations" on public.registrations;
create policy "Signed-in leaders can view registrations" on public.registrations for select to authenticated using (public.is_prefect() or exists (select 1 from public.club_leaders cl where cl.club_id = registrations.club_id and cl.user_id = auth.uid()));
drop policy if exists "Signed-in leaders can manage attendance" on public.attendance;
create policy "Signed-in leaders can manage attendance" on public.attendance for all to authenticated using (public.can_manage_club(attendance.club_id)) with check (public.can_manage_club(attendance.club_id));
drop policy if exists "Leaders can view their assignments" on public.club_leaders;
create policy "Leaders can view their assignments" on public.club_leaders for select to authenticated using (user_id = auth.uid() or public.is_prefect());
drop policy if exists "Prefect can manage assignments" on public.club_leaders;
create policy "Prefect can manage assignments" on public.club_leaders for all to authenticated using (public.is_prefect()) with check (public.is_prefect());
