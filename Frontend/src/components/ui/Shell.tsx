'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings2,
  ShoppingCart,
  Users,
  Package,
  Boxes,
  Warehouse,
  Truck,
  Undo2,
  BarChart3,
  FileText,
  Workflow,
  SlidersHorizontal,
  Plug,
  ShieldCheck,
  CreditCard,
  Search,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Menu,
  X
} from 'lucide-react';
import { useOrganization } from '@/hooks/useOrganization';
import { SignOutButton } from './SignOutButton';
import { ThemeToggle } from './ThemeToggle';

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; badge?: string };

const navSections: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Main menu',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/orders', label: 'Orders', icon: ShoppingCart, badge: '24' },
      { href: '/customers', label: 'Customers', icon: Users },
      { href: '/products', label: 'Products', icon: Package },
      { href: '/inventory', label: 'Inventory', icon: Boxes },
      { href: '/warehouses', label: 'Warehouses', icon: Warehouse },
      { href: '/shipping', label: 'Shipping', icon: Truck },
      { href: '/returns', label: 'Returns', icon: Undo2 },
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/reports', label: 'Reports', icon: FileText }
    ]
  },
  {
    heading: 'Automation',
    items: [
      { href: '/workflows', label: 'Workflows', icon: Workflow },
      { href: '/rules', label: 'Rules', icon: SlidersHorizontal },
      { href: '/integrations', label: 'Integrations', icon: Plug }
    ]
  },
  {
    heading: 'Settings',
    items: [
      { href: '/settings', label: 'Settings', icon: Settings2 },
      { href: '/users', label: 'Users & Roles', icon: ShieldCheck },
      { href: '/billing', label: 'Billing', icon: CreditCard }
    ]
  }
];

interface Crumb {
  label: string;
  href?: string;
}

interface ShellProps {
  children: ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: Crumb[];
  toolbar?: ReactNode;
  /** Legacy alias for `toolbar`, kept for existing pages. */
  actions?: ReactNode;
}

export function Shell({ children, title = 'Overview', description, breadcrumbs, toolbar, actions }: ShellProps) {
  const headerActions = toolbar ?? actions;
  const pathname = usePathname();
  const { data: organization, isLoading } = useOrganization();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const orgInitial = organization?.name?.charAt(0)?.toUpperCase() ?? 'E';
  const planLabel = organization?.plan?.name ? `${organization.plan.name} plan` : 'Enterprise Plan';
  const crumbs: Crumb[] = breadcrumbs ?? [{ label: title }];

  return (
    <div className="min-h-screen text-fg">
      {/* Mobile drawer scrim */}
      {drawerOpen ? (
        <div
          className="fixed inset-0 z-40 bg-fg/40 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      ) : null}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[268px] shrink-0 flex-col border-r border-line bg-surface transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-5">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setDrawerOpen(false)}>
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-brand-gradient text-white shadow-glow">
                <span className="absolute inset-0 bg-brand-sheen" />
                <Boxes className="relative h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none tracking-tight text-fg">eOMS</p>
                <p className="mt-1.5 text-[11px] leading-none text-subtle">Order Management</p>
              </div>
            </Link>
            <button className="text-muted lg:hidden" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-3 pb-4">
            {navSections.map((section) => (
              <div key={section.heading}>
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                  {section.heading}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          active
                            ? 'bg-brand-gradient text-white shadow-glow'
                            : 'text-muted hover:bg-surface-2 hover:text-fg'
                        }`}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] transition-colors ${
                            active ? 'text-white' : 'text-faint group-hover:text-muted'
                          }`}
                          strokeWidth={2}
                        />
                        <span className="flex-1">{item.label}</span>
                        {item.badge ? (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              active ? 'bg-white/20 text-white' : 'bg-brand-soft text-brand-fg'
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-line p-3">
            <button className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface-2 p-2.5 text-left transition hover:border-line-strong">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-xs font-bold text-white">
                {orgInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-fg">
                  {isLoading ? 'Loading…' : organization?.name ?? 'eOMS Demo'}
                </p>
                <p className="truncate text-xs text-subtle">{isLoading ? '—' : planLabel}</p>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-faint" />
            </button>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="glass sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted lg:hidden"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <nav className="flex min-w-0 items-center gap-1.5 text-sm">
                {crumbs.map((c, i) => (
                  <span key={c.label} className="flex min-w-0 items-center gap-1.5">
                    {i > 0 ? <ChevronRight className="h-4 w-4 shrink-0 text-faint" /> : null}
                    {c.href && i < crumbs.length - 1 ? (
                      <Link href={c.href} className="truncate text-muted hover:text-fg">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={`truncate ${i === crumbs.length - 1 ? 'font-semibold text-fg' : 'text-muted'}`}>
                        {c.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              <div className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-subtle shadow-xs transition focus-within:border-brand/50 focus-within:shadow-focus md:flex">
                <Search className="h-4 w-4 text-faint" />
                <input
                  type="search"
                  placeholder="Search anything…"
                  className="w-32 bg-transparent text-sm text-fg outline-none placeholder:text-faint lg:w-56"
                />
                <kbd className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-subtle">⌘K</kbd>
              </div>
              <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted shadow-xs transition hover:border-line-strong hover:text-fg"
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white ring-2 ring-surface">
                  2
                </span>
              </button>
              <ThemeToggle />
              <div className="mx-1 hidden h-6 w-px bg-line sm:block" />
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 rounded-xl p-1 pr-2 transition hover:bg-surface-2"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                    JD
                  </div>
                  <div className="hidden text-left leading-tight sm:block">
                    <p className="text-sm font-semibold text-fg">John Doe</p>
                    <p className="text-[11px] text-subtle">Admin</p>
                  </div>
                  <ChevronsUpDown className="hidden h-4 w-4 text-faint sm:block" />
                </button>
                {menuOpen ? (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} aria-hidden />
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-56 animate-scale-in rounded-2xl border border-line bg-elevated p-2 shadow-lift">
                      <div className="border-b border-line px-3 py-2">
                        <p className="text-sm font-semibold text-fg">John Doe</p>
                        <p className="truncate text-xs text-subtle">john@eoms.demo</p>
                      </div>
                      <div className="pt-2">
                        <SignOutButton className="w-full justify-start" />
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </header>

          {/* Page header + content */}
          <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-[28px]">{title}</h1>
                {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
              </div>
              {headerActions ? <div className="flex flex-wrap items-center gap-2.5">{headerActions}</div> : null}
            </div>

            <div className="animate-fade-up pb-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
