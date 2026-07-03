import Link from 'next/link';
import { ArrowRight, Building2, ShieldCheck, Wallet } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const features = [
  {
    icon: Building2,
    title: 'Multi-tenant organizations',
    description: 'Isolated workspaces with scoped data, roles, and billing per organization.'
  },
  {
    icon: Wallet,
    title: 'Billing & feature gating',
    description: 'Stripe-backed plans, usage limits, and entitlement checks out of the box.'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise access control',
    description: 'Role-based permissions and audit-ready activity across every tenant.'
  }
];

const stats = [
  { label: 'Orders processed', value: '2.4M+' },
  { label: 'Uptime SLA', value: '99.95%' },
  { label: 'Avg. sync latency', value: '180ms' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen text-fg">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white shadow-glow">
            e
          </div>
          <span className="text-sm font-semibold tracking-tight text-fg">eOMS</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth"
            className="inline-flex h-10 items-center rounded-xl border border-line bg-surface px-4 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 lg:px-8 lg:pt-20">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Enterprise OMS foundation
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tightest text-fg sm:text-6xl">
            Run multi-tenant order operations from one{' '}
            <span className="text-gradient">command center.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            eOMS is a production-grade foundation for order management, billing, and organization
            administration — built for teams that need secure, auditable workflows from day one.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 text-sm font-medium text-white shadow-soft transition hover:shadow-glow"
            >
              Open dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/settings"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-surface px-6 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong hover:bg-surface-2"
            >
              Settings
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-y border-line py-7">
          {stats.map((stat) => (
            <div key={stat.label} className="animate-fade-up">
              <dt className="text-xs text-subtle">{stat.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-fg sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group animate-fade-up rounded-2xl border border-line bg-surface p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h2 className="mt-5 text-sm font-semibold text-fg">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
