# eOMS Backend

Backend services for the eCommerce Order Management System.

## Local setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set required environment variables.
4. Run tests:
   ```bash
   npm test
   ```

## Supabase Auth setup

Run these once against the Supabase project (SQL editor or CLI), in order:

1. `src/db/migrations.ts` — creates the application tables.
2. `src/db/rls-policies.sql` — enables row-level security and tenant isolation.
3. `src/db/auth-triggers.sql` — mirrors `auth.users` into `public.users` on sign-up so
   `organization_memberships`, RLS policies, and `getUserById`/`getUserOrganizations` have a row to join against.

In the Supabase dashboard, under Authentication → URL Configuration, add the frontend's
callback URL to the redirect allowlist (e.g. `http://localhost:3000/auth/callback` for local
dev, plus the production origin).
