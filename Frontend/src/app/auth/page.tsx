'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, MailCheck, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const highlights = [
  'Role-based access across every organization',
  'Stripe billing and plan entitlements built in',
  'Audit-ready activity on every tenant'
];

type Mode = 'sign-in' | 'sign-up' | 'magic-link';

const modeCopy: Record<Mode, { title: string; description: string; cta: string }> = {
  'sign-in': {
    title: 'Sign in to eOMS',
    description: 'Enter your credentials to access your workspace.',
    cta: 'Sign in'
  },
  'sign-up': {
    title: 'Create your account',
    description: 'Set up a password to start managing your organization.',
    cta: 'Create account'
  },
  'magic-link': {
    title: 'Sign in with a magic link',
    description: 'Enter your work email to receive a secure sign-in link.',
    cta: 'Send sign-in link'
  }
};

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const callbackError = searchParams.get('error');

  const [mode, setMode] = useState<Mode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(callbackError ?? '');
  const [error, setError] = useState(Boolean(callbackError));
  const [loading, setLoading] = useState(false);

  function redirectUrl() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    if (mode === 'magic-link') {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectUrl() }
      });

      if (signInError) {
        setError(true);
        setMessage(signInError.message);
      } else {
        setMessage('Check your email for the sign-in link.');
      }
    } else if (mode === 'sign-up') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl() }
      });

      if (signUpError) {
        setError(true);
        setMessage(signUpError.message);
      } else if (!data.session) {
        setMessage('Check your email to confirm your account before signing in.');
      } else {
        router.push(next);
        router.refresh();
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(true);
        setMessage(signInError.message);
      } else {
        router.push(next);
        router.refresh();
      }
    }

    setLoading(false);
  }

  const copy = modeCopy[mode];
  const inputClass =
    'mt-2 w-full rounded-xl border border-line bg-field px-4 py-2.5 text-sm text-fg outline-none transition placeholder:text-faint focus:border-brand/60 focus:shadow-focus';

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand scene */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary-900 p-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(40rem 40rem at 15% 10%, rgba(108,99,255,0.55), transparent 55%), radial-gradient(35rem 35rem at 90% 90%, rgba(56,189,248,0.35), transparent 55%)'
          }}
        />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-sm font-bold ring-1 ring-white/20 backdrop-blur">
            e
          </div>
          <span className="text-sm font-semibold tracking-tight">eOMS</span>
        </div>

        <div className="relative max-w-md">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <ShieldCheck className="h-6 w-6 text-white" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Secure enterprise access for your organization&apos;s order operations.
          </h2>
          <ul className="mt-8 space-y-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">© {new Date().getFullYear()} eOMS. All rights reserved.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white">
              e
            </div>
            <span className="text-sm font-semibold tracking-tight text-fg">eOMS</span>
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight text-fg">{copy.title}</h1>
          <p className="mt-2 text-sm text-muted">{copy.description}</p>

          {mode !== 'magic-link' ? (
            <div className="mt-6 inline-flex rounded-xl border border-line bg-surface-2 p-1 text-sm">
              <button
                type="button"
                onClick={() => setMode('sign-in')}
                className={cn(
                  'rounded-lg px-3.5 py-1.5 font-medium transition',
                  mode === 'sign-in' ? 'bg-surface text-fg shadow-xs' : 'text-subtle hover:text-fg'
                )}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode('sign-up')}
                className={cn(
                  'rounded-lg px-3.5 py-1.5 font-medium transition',
                  mode === 'sign-up' ? 'bg-surface text-fg shadow-xs' : 'text-subtle hover:text-fg'
                )}
              >
                Create account
              </button>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-fg">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                className={inputClass}
                required
              />
            </label>

            {mode !== 'magic-link' ? (
              <label className="block text-sm font-medium text-fg">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
                  minLength={8}
                  className={inputClass}
                  required
                />
              </label>
            ) : null}

            <Button type="submit" loading={loading} size="lg" className="w-full">
              {loading ? 'Please wait…' : copy.cta}
            </Button>
          </form>

          {mode === 'sign-in' ? (
            <button
              type="button"
              onClick={() => setMode('magic-link')}
              className="mt-4 w-full text-center text-sm font-medium text-brand hover:text-brand-strong"
            >
              Sign in with a magic link instead
            </button>
          ) : null}

          {mode === 'magic-link' ? (
            <button
              type="button"
              onClick={() => setMode('sign-in')}
              className="mt-4 w-full text-center text-sm font-medium text-brand hover:text-brand-strong"
            >
              Back to password sign-in
            </button>
          ) : null}

          {message ? (
            <div
              className={cn(
                'mt-5 flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm',
                error
                  ? 'border-danger/20 bg-danger-soft text-danger-fg'
                  : 'border-success/20 bg-success-soft text-success-fg'
              )}
            >
              {error ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <MailCheck className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{message}</span>
            </div>
          ) : null}

          <p className="mt-8 text-center text-xs text-subtle">
            Protected by row-level security and single-use magic links.
          </p>
        </div>
      </div>
    </div>
  );
}
