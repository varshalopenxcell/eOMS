'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Zap
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Mode = 'sign-in' | 'sign-up';

const modeCopy: Record<Mode, { title: string; description: string; cta: string }> = {
  'sign-in': {
    title: 'Welcome back',
    description: 'Sign in to your eOMS workspace to continue.',
    cta: 'Sign in'
  },
  'sign-up': {
    title: 'Create your account',
    description: 'Set up an account to start managing your organization.',
    cta: 'Create account'
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(callbackError ?? '');
  const [error, setError] = useState(Boolean(callbackError));
  const [loading, setLoading] = useState(false);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage('');
    setError(false);
  }

  function fillDemo() {
    setEmail('test@eoms.dev');
    setPassword('Test1234!');
    setMessage('');
    setError(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError(false);

    if (mode === 'sign-up') {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(true);
        setMessage(body.error ?? 'Could not create your account.');
        setLoading(false);
        return;
      }

      // Account is created + email-confirmed server-side; sign straight in.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(true);
        setMessage(signInError.message);
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
  const fieldClass =
    'w-full rounded-xl border border-line bg-field py-2.5 pl-11 pr-4 text-sm text-fg outline-none transition placeholder:text-faint focus:border-brand/60 focus:shadow-focus';

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <BrandPanel />

      {/* Form column */}
      <div className="relative flex items-center justify-center overflow-hidden bg-surface px-6 py-14">
        {/* Soft backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(34rem 22rem at 50% -8%, rgba(99,102,241,0.08), transparent 62%)'
          }}
        />
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" />

        <div className="relative w-full max-w-sm animate-fade-up">
          {/* Logo mark */}
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-brand-gradient text-white shadow-glow">
              <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
              <Boxes className="relative h-5 w-5" strokeWidth={2.25} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-fg">eOMS</span>
          </Link>

          <h1 className="text-[26px] font-bold tracking-tight text-fg">{copy.title}</h1>
          <p className="mt-1.5 text-sm text-muted">{copy.description}</p>

          {/* Segmented toggle */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface-2 p-1 text-sm">
            <button
              type="button"
              onClick={() => switchMode('sign-in')}
              className={cn(
                'rounded-lg px-3.5 py-2 font-medium transition',
                mode === 'sign-in' ? 'bg-surface text-fg shadow-xs' : 'text-subtle hover:text-fg'
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode('sign-up')}
              className={cn(
                'rounded-lg px-3.5 py-2 font-medium transition',
                mode === 'sign-up' ? 'bg-surface text-fg shadow-xs' : 'text-subtle hover:text-fg'
              )}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {mode === 'sign-up' ? (
              <label className="block">
                <span className="text-sm font-medium text-fg">Full name</span>
                <div className="relative mt-2">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Jordan Lee"
                    autoComplete="name"
                    className={fieldClass}
                    required
                  />
                </div>
              </label>
            ) : null}

            <label className="block">
              <span className="text-sm font-medium text-fg">Email address</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={fieldClass}
                  required
                />
              </div>
            </label>

            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-fg">Password</span>
                {mode === 'sign-in' ? (
                  <span className="text-xs text-faint">Min. 8 characters</span>
                ) : null}
              </div>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
                  minLength={8}
                  className={cn(fieldClass, 'pr-11')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-faint transition hover:text-muted"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <Button type="submit" loading={loading} size="lg" className="w-full">
              {loading ? 'Please wait…' : copy.cta}
            </Button>
          </form>

          {mode === 'sign-in' ? (
            <button
              type="button"
              onClick={fillDemo}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-line px-3 py-2.5 text-xs font-medium text-muted transition hover:border-brand/40 hover:text-fg"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Use demo credentials
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
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              )}
              <span>{message}</span>
            </div>
          ) : null}

          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-subtle">
            <Lock className="h-3.5 w-3.5" />
            Protected by row-level security and encrypted sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: ShieldCheck, title: 'Role-based access', description: 'Granular permissions across every organization and tenant.' },
  { icon: Zap, title: 'Automations built in', description: 'Route orders, notify teams, and reorder stock — no code.' },
  { icon: Globe2, title: 'Omnichannel sync', description: 'Storefronts, marketplaces, and ERPs, reconciled in real time.' }
];

const stats = [
  { label: 'Orders processed', value: '2.4M+' },
  { label: 'Uptime SLA', value: '99.95%' },
  { label: 'Avg. sync', value: '180ms' }
];

function BrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-primary-900 p-10 text-white lg:flex xl:p-14">
      {/* Layered gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(42rem 42rem at 12% 8%, rgba(129,140,248,0.55), transparent 55%), radial-gradient(38rem 38rem at 88% 92%, rgba(56,189,248,0.30), transparent 55%), radial-gradient(30rem 30rem at 80% 12%, rgba(168,85,247,0.35), transparent 60%)'
        }}
      />
      {/* Floating glow blobs */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl animate-pulse" />
      <div
        className="pointer-events-none absolute -right-16 bottom-16 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl animate-pulse"
        style={{ animationDelay: '1.2s' }}
      />
      {/* Grid + noise overlays */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.09]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />

      {/* Brand mark */}
      <div className="relative flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <Boxes className="relative h-5 w-5" strokeWidth={2.25} />
        </div>
        <div className="leading-none">
          <p className="text-sm font-bold tracking-tight">eOMS</p>
          <p className="mt-1 text-[11px] text-white/60">Order Management</p>
        </div>
      </div>

      {/* Headline + features */}
      <div className="relative max-w-lg">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Enterprise OMS platform
        </span>
        <h2 className="mt-5 text-[2.1rem] font-semibold leading-[1.1] tracking-tight xl:text-[2.5rem]">
          Ship faster, stock smarter,
          <br />
          scale
          <span className="bg-gradient-to-r from-white via-indigo-100 to-sky-200 bg-clip-text text-transparent">
            {' '}
            without the chaos.
          </span>
        </h2>

        <div className="mt-8 space-y-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.1]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/65">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats + footer */}
      <div className="relative">
        <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[11px] text-white/55">{stat.label}</dt>
              <dd className="mt-1 flex items-center gap-1 text-xl font-bold tabular-nums tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex items-center justify-between text-[11px] text-white/45">
          <span>© {new Date().getFullYear()} eOMS. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            Trusted by 1,200+ teams
          </span>
        </div>
      </div>
    </div>
  );
}
