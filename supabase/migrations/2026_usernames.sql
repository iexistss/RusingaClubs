-- Add durable username login support to an existing Rusinga Clubs database.
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists login_email text;

update public.profiles as profiles
set login_email = users.email
from auth.users as users
where users.id = profiles.id and profiles.login_email is null;

create unique index if not exists profiles_username_idx
on public.profiles(lower(username))
where username is not null;

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
