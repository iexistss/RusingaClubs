-- Rusinga Clubs schema. Run this once in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  audience text not null default 'All years',
  subscription_required boolean not null default false,
  meeting_day text not null,
  meeting_time text not null,
  leader_name text not null default '',
  leader_contact text,
  created_at timestamptz not null default now()
);
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_year text not null,
  contact text,
  created_at timestamptz not null default now()
);
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  club_id uuid not null references public.clubs(id) on delete cascade,
  school_year text not null default '2026/2027',
  date_registered timestamptz not null default now(),
  unique(student_id, club_id, school_year)
);
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  session_date date not null,
  present boolean not null default false,
  unique(club_id, student_id, session_date)
);
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
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  login_email text,
  full_name text not null default '',
  role text not null default 'leader' check (role in ('leader', 'prefect')),
  created_at timestamptz not null default now()
);
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
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

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

alter table public.clubs enable row level security;
alter table public.students enable row level security;
alter table public.registrations enable row level security;
alter table public.attendance enable row level security;
alter table public.club_change_requests enable row level security;
alter table public.profiles enable row level security;

create policy "Anyone can view clubs" on public.clubs for select using (true);
create policy "Anyone can register as a student" on public.students for insert with check (true);
create policy "Anyone can join a club" on public.registrations for insert with check (true);
create policy "Signed-in leaders can view students" on public.students for select to authenticated using (true);
create policy "Signed-in leaders can view registrations" on public.registrations for select to authenticated using (true);
create policy "Signed-in leaders can manage attendance" on public.attendance for all to authenticated using (true) with check (true);
create policy "Anyone can submit a club change request" on public.club_change_requests for insert with check (true);
create policy "Signed-in leaders can view change requests" on public.club_change_requests for select to authenticated using (true);
create policy "Signed-in leaders can review change requests" on public.club_change_requests for update to authenticated using (true) with check (true);
create policy "Users can view their own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Prefect can manage clubs" on public.clubs for all to authenticated using (exists (select 1 from public.profiles where id = auth.uid() and role = 'prefect')) with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'prefect'));

insert into public.clubs (name, description, audience, meeting_day, meeting_time, leader_name, subscription_required)
select * from (values
  ('Archery', 'Focus, form, and calm under pressure.', 'All years', 'Monday', '3:45 PM', 'To be assigned', true),
  ('Chess', 'Build a sharper game through tactics, patience, and friendly competition.', 'KS3 & KS4', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Chess', 'Advanced chess for Sixth Form students.', 'KS5 Sixth Form', 'Tuesday', '3:45 PM', 'To be assigned', true),
  ('World Scholars', 'Explore global issues, research deeply, and represent Rusinga with confidence.', 'All years', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('Board Games', 'Strategy, teamwork, and a little friendly rivalry around the table.', 'KS3 & KS4', 'Thursday', '3:45 PM', 'To be assigned', false),
  ('Board Games', 'A relaxed Year 12 space for classic games and new challenges.', 'Sixth Form · Year 12', 'Thursday', '3:45 PM', 'To be assigned', false),
  ('Board Games', 'A relaxed Year 13 space for classic games and new challenges.', 'Sixth Form · Year 13', 'Thursday', '3:45 PM', 'To be assigned', false),
  ('Art and Design', 'Experiment with materials, develop your eye, and make work you are proud of.', 'All years', 'Monday', '3:45 PM', 'To be assigned', false),
  ('Debating', 'Find your voice, think on your feet, and make an argument that moves people.', 'All years', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Photography', 'Learn to see differently through composition, light, and visual storytelling.', 'KS5 Sixth Form only', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('EMUN / SAIMUN', 'Prepare for Model United Nations and learn diplomacy through live debate.', 'All years', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('Aviation', 'Discover the science, history, and future of flight.', 'All years', 'Friday', '3:45 PM', 'To be assigned', true),
  ('Library', 'Read widely, share recommendations, and make the library your quiet corner.', 'All years', 'Monday', '3:45 PM', 'To be assigned', false),
  ('First Aid', 'Build practical skills to stay calm, help others, and respond when it matters.', 'All years', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Soccer', 'Train together, compete fairly, and keep the beautiful game moving.', 'KS3', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('Cookery', 'Learn kitchen confidence, explore flavours, and make something worth sharing.', 'All years', 'Thursday', '3:45 PM', 'To be assigned', true),
  ('Environment and Conservation', 'Lead practical projects that make our school and community greener.', 'All years', 'Friday', '3:45 PM', 'To be assigned', false),
  ('Pottery', 'Shape, glaze, and fire your ideas in a hands-on creative studio.', 'All years', 'Monday', '3:45 PM', 'To be assigned', true),
  ('Coding / Robotics / Hackathon', 'Build useful things with curious people and turn ideas into working projects.', 'All years', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Soap Making', 'Make, test, and package creative soap projects.', 'All years', 'Wednesday', '3:45 PM', 'To be assigned', true),
  ('Knitting (Yarn / Crocheting)', 'A calm, creative space to learn yarn craft and make something useful.', 'All years', 'Thursday', '3:45 PM', 'To be assigned', true),
  ('Badminton', 'Move fast, play fair, and build your game one rally at a time.', 'All years', 'Friday', '3:45 PM', 'To be assigned', false),
  ('Table Tennis', 'Quick reactions, smart placement, and plenty of matches.', 'All years', 'Monday', '3:45 PM', 'To be assigned', false),
  ('Skating', 'Find your balance, build confidence, and enjoy moving together.', 'All years', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Drama', 'Create characters, tell bold stories, and find confidence on stage.', 'All years', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('Modelling', 'Design, build, and present models that bring imagination to life.', 'All years', 'Thursday', '3:45 PM', 'To be assigned', false),
  ('Golf', 'Learn the fundamentals, practise your swing, and enjoy the course.', 'All years', 'Friday', '3:45 PM', 'To be assigned', false),
  ('Community Service', 'Turn care into action through projects that support our wider community.', 'All years', 'Monday', '3:45 PM', 'To be assigned', false),
  ('Rotary (Interact / Bikerthon seasonal)', 'Serve, lead, and take part in seasonal Interact and Bikerthon projects.', 'All years', 'Tuesday', '3:45 PM', 'To be assigned', false),
  ('Dance', 'Find rhythm, build confidence, and create performances together.', 'All years', 'Wednesday', '3:45 PM', 'To be assigned', false),
  ('Basketball', 'Run plays, sharpen your skills, and compete as a team.', 'All years', 'Thursday', '3:45 PM', 'To be assigned', false),
  ('Netball', 'Develop your passing, movement, and teamwork on court.', 'All years', 'Friday', '3:45 PM', 'To be assigned', false)
) as seed(name, description, audience, meeting_day, meeting_time, leader_name, subscription_required)
where not exists (select 1 from public.clubs);
