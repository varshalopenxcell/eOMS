# eOMS Frontend

Next.js frontend for the eCommerce Order Management System.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Auth flow

Authentication is handled by Supabase Auth via `@supabase/ssr`, with sessions stored in
cookies so browser, server components, route handlers, and middleware all see the same
signed-in state:

- `src/lib/supabase/client.ts` — browser client (`createBrowserClient`), used in client components.
- `src/lib/supabase/server.ts` — server client for Server Components/Route Handlers, plus
  `getAuthedUser()` for API routes.
- `src/lib/supabase/middleware.ts` — refreshes the session on every request and redirects
  signed-out users away from protected routes (`/dashboard`, `/orders`, `/customers`,
  `/products`, `/settings`) and signed-in users away from `/auth`.
- `src/app/auth/page.tsx` — sign in (password), create account, and magic-link modes.
- `src/app/auth/callback/route.ts` — exchanges the magic-link/confirmation/OAuth `code` for a session.
- `src/components/ui/SignOutButton.tsx` — signs out and redirects to `/auth`.

Requires the Supabase project's Authentication → URL Configuration to allow
`<origin>/auth/callback` as a redirect URL, and the `Backend/src/db/auth-triggers.sql`
trigger applied so new sign-ups get a row in `public.users`.
