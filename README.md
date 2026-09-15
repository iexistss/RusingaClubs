# Rusinga Clubs

Rusinga Clubs is a small, mobile-friendly clubs registration and attendance system for Rusinga School. It uses Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Run locally

Requirements: Node.js 18.17+ and a Supabase project (optional for the demo UI).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without environment variables, the app runs with sample clubs and local demo interactions. To connect Supabase, set these values in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

Run `supabase/schema.sql` in the Supabase SQL editor. If you already ran the earlier version of the schema, run these migrations as well:

```text
supabase/migrations/2026_profiles.sql
supabase/migrations/2026_usernames.sql
supabase/migrations/2026_club_leaders.sql
supabase/migrations/2026_school_year_and_prefect.sql
supabase/migrations/2026_club_change_requests.sql
```

`2026_profiles.sql` creates `public.profiles` and automatically creates a leader profile whenever a new Supabase Auth user is added. Create club leader accounts in Supabase Authentication > Users. The `/login` page uses Supabase email/password authentication.

Staff can then use a durable username instead of remembering an email address:

```sql
update public.profiles
set username = 'clubsprefect',
    login_email = 'your-real-email@example.com',
    full_name = 'Clubs Prefect',
    role = 'prefect'
where id = 'YOUR_AUTH_USER_UUID';
```

The password remains managed by Supabase Auth and is never stored in this project. The login screen accepts either `clubsprefect` or the account email.

The Prefect account page at `/admin/users` creates teacher accounts through a server-only Supabase Admin API. Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel as a private variable (never `NEXT_PUBLIC_`) before using it. Teachers are assigned to clubs there and only see those clubs after signing in.

## Logo

The supplied crest is now loaded from `public/logo/rusinga-crest.png`. Replace that file with a higher-resolution official crest later if needed; the navbar and footer will update automatically.

## Clubs Prefect access

Do not hardcode a personal password into the project. Create the Clubs Prefect account in Supabase Authentication > Users using your own email and password, then promote that account with this SQL:

```sql
insert into public.profiles (id, full_name, role)
select id, 'Clubs Prefect', 'prefect'
from auth.users
where email = 'your-email@example.com'
on conflict (id) do update set role = 'prefect', full_name = 'Clubs Prefect';
```

After signing in at `/login`, open `/admin/manage` to add or remove clubs and update leader names and contacts. Leaders can use the dashboard and attendance pages but cannot use the management controls.

The active school year is `2026/2027`, running September through June. Students can register for up to two clubs per school year. The public `/request-change` page records requests for a leader or Prefect to review; authenticated staff can review them at `/admin/requests`.

## Password recovery

The login screen links to `/forgot-password`, and reset emails return to `/update-password`. In Supabase **Authentication > URL Configuration**, add these URLs:

```text
https://your-domain.com/forgot-password
https://your-domain.com/update-password
https://your-domain.com/**
```

For local testing also add `http://localhost:3000/**`. If reset emails do not arrive, check Supabase **Authentication > Logs** and configure a custom SMTP provider under the project Auth email settings; the default email service is rate-limited.

## Deploy to Vercel

1. Push this folder to a GitHub repository and import it into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Vercel Project Settings > Environment Variables.
3. Add `SUPABASE_SERVICE_ROLE_KEY` as a private server-only variable if the Prefect will create teacher accounts from `/admin/users`.
4. Deploy. Every future push to the selected branch will deploy automatically.

For a custom domain, open Vercel Project Settings > Domains, add the school domain, then create the DNS record Vercel shows at your domain provider. Vercel will issue HTTPS automatically after DNS verification.

## Keeping it maintainable

- `src/lib/types.ts` contains the demo club data and shared types.
- `src/lib/data.ts` is the single public club data boundary.
- `supabase/schema.sql` is the database source of truth.
- Keep the free tier healthy by storing one attendance row per student, club, and session date, and avoid polling. Export older records as CSV for school archives.
