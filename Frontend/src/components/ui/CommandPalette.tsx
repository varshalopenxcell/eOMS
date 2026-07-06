'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Boxes,
  CornerDownLeft,
  CreditCard,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Settings2,
  ShoppingCart,
  Users,
  type LucideIcon
} from 'lucide-react';
import { seedCustomers, seedProducts, seedOrders } from '@/stores/seedData';
import { orderStatusLabel } from '@/stores/ordersStore';
import { cn, formatCents } from '@/lib/utils';

type Item = { key: string; label: string; sublabel?: string; href: string; icon: LucideIcon };
type Group = { heading: string; items: Item[] };

const pages: Item[] = [
  { key: 'p-dash', label: 'Dashboard', sublabel: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { key: 'p-orders', label: 'Orders', sublabel: 'Fulfillment & lifecycle', href: '/orders', icon: ShoppingCart },
  { key: 'p-customers', label: 'Customers', sublabel: 'Buyer directory', href: '/customers', icon: Users },
  { key: 'p-products', label: 'Products', sublabel: 'Catalog', href: '/products', icon: Package },
  { key: 'p-inventory', label: 'Inventory', sublabel: 'Stock levels', href: '/inventory', icon: Boxes },
  { key: 'p-analytics', label: 'Analytics', sublabel: 'Revenue & channels', href: '/analytics', icon: BarChart3 },
  { key: 'p-billing', label: 'Billing', sublabel: 'Plan & invoices', href: '/billing', icon: CreditCard },
  { key: 'p-settings', label: 'Settings', sublabel: 'Workspace', href: '/settings', icon: Settings2 }
];

const quickActions: Item[] = [
  { key: 'a-order', label: 'Create new order', href: '/orders', icon: Plus },
  { key: 'a-customer', label: 'Add customer', href: '/customers', icon: Plus },
  { key: 'a-product', label: 'Add product', href: '/products', icon: Plus }
];

const customerName = (id: string) => seedCustomers.find((c) => c.id === id)?.name ?? 'Unknown';

const orderItems: Item[] = seedOrders.map((o) => ({
  key: `o-${o.id}`,
  label: `Order #${o.id}`,
  sublabel: `${customerName(o.customerId)} · ${orderStatusLabel[o.status]} · ${formatCents(
    o.items.reduce((s, it) => s + it.priceCents * it.quantity, 0),
    o.currency
  )}`,
  href: `/orders/${o.id}`,
  icon: ShoppingCart
}));

const customerItems: Item[] = seedCustomers.map((c) => ({
  key: `c-${c.id}`,
  label: c.name,
  sublabel: c.company || c.email,
  href: `/customers/${c.id}`,
  icon: Users
}));

const productItems: Item[] = seedProducts.map((p) => ({
  key: `pr-${p.id}`,
  label: p.name,
  sublabel: `${p.sku} · ${formatCents(p.priceCents)}`,
  href: `/products/${p.id}`,
  icon: Package
}));

function matches(item: Item, q: string) {
  return `${item.label} ${item.sublabel ?? ''}`.toLowerCase().includes(q);
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global ⌘K / Ctrl+K toggle
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // focus after the panel mounts
      const id = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const groups: Group[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        { heading: 'Jump to', items: pages },
        { heading: 'Quick actions', items: quickActions }
      ];
    }
    const cap = (arr: Item[]) => arr.filter((i) => matches(i, q)).slice(0, 6);
    return [
      { heading: 'Pages', items: cap(pages) },
      { heading: 'Orders', items: cap(orderItems) },
      { heading: 'Customers', items: cap(customerItems) },
      { heading: 'Products', items: cap(productItems) },
      { heading: 'Actions', items: cap(quickActions) }
    ].filter((g) => g.items.length > 0);
  }, [query]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    setActive((a) => (a >= flat.length ? 0 : a));
  }, [flat.length]);

  function select(item?: Item) {
    const target = item ?? flat[active];
    if (!target) return;
    setOpen(false);
    router.push(target.href);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((a) => (flat.length ? (a + 1) % flat.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((a) => (flat.length ? (a - 1 + flat.length) % flat.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      select();
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  let runningIndex = -1;

  return (
    <>
      {/* Trigger (desktop) */}
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-subtle shadow-xs transition hover:border-line-strong md:flex"
      >
        <Search className="h-4 w-4 text-faint" />
        <span className="w-32 text-left lg:w-56">Search anything…</span>
        <kbd className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-subtle">⌘K</kbd>
      </button>

      {/* Trigger (mobile icon) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted shadow-xs transition hover:border-line-strong hover:text-fg md:hidden"
      >
        <Search className="h-[18px] w-[18px]" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex justify-center bg-fg/40 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="h-fit w-full max-w-xl animate-scale-in overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search orders, customers, products, pages…"
                className="w-full bg-transparent py-3.5 text-sm text-fg outline-none placeholder:text-faint"
              />
              <kbd className="hidden rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-subtle sm:block">
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[56vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  No results for “{query}”
                </p>
              ) : (
                groups.map((group) => (
                  <div key={group.heading} className="mb-1">
                    <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                      {group.heading}
                    </p>
                    {group.items.map((item) => {
                      runningIndex += 1;
                      const index = runningIndex;
                      const isActive = index === active;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          onClick={() => select(item)}
                          onMouseMove={() => setActive(index)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition',
                            isActive ? 'bg-surface-2' : 'hover:bg-surface-2/60'
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                              isActive ? 'bg-brand-gradient text-white' : 'bg-surface-2 text-muted'
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-fg">{item.label}</p>
                            {item.sublabel ? <p className="truncate text-xs text-faint">{item.sublabel}</p> : null}
                          </div>
                          {isActive ? <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-faint" /> : null}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5">↵</kbd> open
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5">esc</kbd> close
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
