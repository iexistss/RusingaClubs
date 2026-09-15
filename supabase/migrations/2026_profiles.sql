-- Run this if public.profiles does not exist.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  login_email text,
  full_name text not null default '',
  role text not null default 'leader' check (role in ('leader', 'prefect')),
  created_at timestamptz not null default now()
);
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists login_email text;

alter table public.profiles enable row level security;
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile" on public.profiles for select to authenticated using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, login_email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''), 'leader')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

update public.profiles as profiles
set login_email = users.email
from auth.users as users
where users.id = profiles.id and profiles.login_email is null;
create unique index if not exists profiles_username_idx on public.profiles(lower(username)) where username is not null;

create or replace function public.resolve_login_email(login_username text)
returns text
language sql
stable
security definer set search_path = public
as $$
  select login_email from public.profiles
  where lower(username) = lower(trim(login_username))
  limit 1;
$$;
revoke all on function public.resolve_login_email(text) from public;
grant execute on function public.resolve_login_email(text) to anon, authenticated;
