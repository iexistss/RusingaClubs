-- Run this migration if the original schema was already applied.
create or replace function public.current_school_year()
returns text
language sql
stable
as $$
  select case
    when extract(month from current_date) >= 8
      then extract(year from current_date)::int || '/' || (extract(year from current_date)::int + 1)
    else (extract(year from current_date)::int - 1) || '/' || extract(year from current_date)::int
  end;
$$;
alter table public.clubs add column if not exists audience text not null default 'All years';
alter table public.clubs add column if not exists subscription_required boolean not null default false;
alter table public.registrations add column if not exists school_year text not null default public.current_school_year();
alter table public.registrations alter column school_year set default public.current_school_year();
alter table public.registrations drop constraint if exists registrations_student_id_club_id_key;
alter table public.registrations drop constraint if exists registrations_student_id_school_year_key;
drop index if exists registrations_one_club_per_school_year_idx;
create unique index if not exists registrations_student_club_school_year_idx on public.registrations(student_id, club_id, school_year);

create or replace function public.enforce_two_club_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.registrations where student_id = new.student_id and school_year = new.school_year and id <> coalesce(new.id, gen_random_uuid())) >= 2 then
    raise exception 'Students may register for up to two clubs per school year';
  end if;
  return new;
end;
$$;
drop trigger if exists registrations_two_club_limit on public.registrations;
create trigger registrations_two_club_limit before insert or update on public.registrations for each row execute function public.enforce_two_club_limit();

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'leader' check (role in ('leader', 'prefect')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "Prefect can manage clubs" on public.clubs;
create policy "Prefect can manage clubs" on public.clubs for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role = 'prefect')) with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'prefect'));
