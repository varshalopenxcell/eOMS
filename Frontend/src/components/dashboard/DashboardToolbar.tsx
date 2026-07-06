'use client';

import { useState } from 'react';
import { Calendar, Check, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Date-range dropdown (mock calendar)                                 */
/* ------------------------------------------------------------------ */

const presets: { label: string; range: string }[] = [
  { label: 'Today', range: 'Jul 6, 2026' },
  { label: 'Yesterday', range: 'Jul 5, 2026' },
  { label: 'Last 7 days', range: 'Jun 30 – Jul 6, 2026' },
  { label: 'Last 30 days', range: 'Jun 7 – Jul 6, 2026' },
  { label: 'This month', range: 'Jul 1 – Jul 31, 2026' },
  { label: 'Last month', range: 'Jun 1 – Jun 30, 2026' },
  { label: 'This quarter', range: 'Jul 1 – Sep 30, 2026' }
];

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Fixed mock month: July 2026 (today = the 6th, selected range = 1–6).
const firstWeekday = new Date(2026, 6, 1).getDay();
const daysInMonth = new Date(2026, 7, 0).getDate();
const calendarCells: (number | null)[] = [
  ...Array.from({ length: firstWeekday }, () => null),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
];
const TODAY = 6;
const RANGE_START = 1;
const RANGE_END = 6;

function DateRangeDropdown() {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('This month');
  const [label, setLabel] = useState('Jul 1 – Jul 31, 2026');

  function choose(preset: { label: string; range: string }) {
    setActivePreset(preset.label);
    setLabel(preset.range);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong"
      >
        <Calendar className="h-4 w-4 text-muted" />
        {label}
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-[min(34rem,calc(100vw-1.5rem))] animate-scale-in flex-col overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift sm:flex-row">
            {/* Presets */}
            <div className="border-b border-line p-2 sm:w-44 sm:border-b-0 sm:border-r">
              <p className="px-2 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                Quick ranges
              </p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-1">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => choose(preset)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition',
                      activePreset === preset.label
                        ? 'bg-brand-soft font-medium text-brand-fg'
                        : 'text-muted hover:bg-surface-2 hover:text-fg'
                    )}
                  >
                    {preset.label}
                    {activePreset === preset.label ? <Check className="h-3.5 w-3.5" /> : null}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div className="flex-1 p-3">
              <div className="mb-2 flex items-center justify-between px-1">
                <button className="rounded-md p-1 text-faint transition hover:bg-surface-2 hover:text-fg" aria-label="Previous month">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-sm font-semibold text-fg">July 2026</p>
                <button className="rounded-md p-1 text-faint transition hover:bg-surface-2 hover:text-fg" aria-label="Next month">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {weekdays.map((day) => (
                  <span key={day} className="py-1 text-[10px] font-semibold uppercase text-faint">
                    {day}
                  </span>
                ))}
                {calendarCells.map((day, index) => {
                  if (day === null) return <span key={`b-${index}`} />;
                  const inRange = day >= RANGE_START && day <= RANGE_END;
                  const isToday = day === TODAY;
                  return (
                    <button
                      key={day}
                      className={cn(
                        'flex h-8 items-center justify-center rounded-lg text-sm tabular-nums transition',
                        isToday
                          ? 'bg-brand-gradient font-semibold text-white shadow-glow'
                          : inRange
                            ? 'bg-brand-soft text-brand-fg'
                            : 'text-fg hover:bg-surface-2'
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 border-t border-line px-1 pt-2.5 text-xs text-subtle">
                Selected: <span className="font-medium text-fg">{label}</span>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Filters dropdown (mock)                                             */
/* ------------------------------------------------------------------ */

const channelOptions = ['Online Store', 'Amazon', 'Retail POS', 'Wholesale', 'eBay'];
const statusOptions = ['Draft', 'Processing', 'Fulfilled', 'Cancelled'];
const regionOptions = ['All regions', 'North America', 'Europe', 'APAC', 'Middle East'];

function FiltersDropdown() {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<string[]>(['Online Store', 'Amazon']);
  const [statuses, setStatuses] = useState<string[]>(['Fulfilled']);
  const [region, setRegion] = useState('All regions');

  const activeCount = channels.length + statuses.length + (region !== 'All regions' ? 1 : 0);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function reset() {
    setChannels([]);
    setStatuses([]);
    setRegion('All regions');
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg shadow-xs transition hover:border-line-strong"
      >
        <SlidersHorizontal className="h-4 w-4 text-muted" />
        Filters
        {activeCount > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gradient px-1 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(20rem,calc(100vw-1.5rem))] animate-scale-in overflow-hidden rounded-2xl border border-line bg-elevated shadow-lift">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="text-sm font-semibold text-fg">Filters</p>
              <button onClick={reset} className="text-xs font-medium text-brand hover:text-brand-strong">
                Reset
              </button>
            </div>

            <div className="max-h-[24rem] space-y-4 overflow-y-auto p-4">
              <FilterGroup title="Sales channel">
                {channelOptions.map((option) => (
                  <CheckRow
                    key={option}
                    label={option}
                    checked={channels.includes(option)}
                    onToggle={() => toggle(channels, setChannels, option)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup title="Order status">
                {statusOptions.map((option) => (
                  <CheckRow
                    key={option}
                    label={option}
                    checked={statuses.includes(option)}
                    onToggle={() => toggle(statuses, setStatuses, option)}
                  />
                ))}
              </FilterGroup>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-faint">Region</p>
                <select
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="w-full rounded-lg border border-line bg-field px-3 py-2 text-sm text-fg outline-none transition focus:border-brand/60"
                >
                  {regionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-line p-3">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-brand-gradient py-2.5 text-sm font-medium text-white shadow-soft transition hover:shadow-glow"
              >
                Apply filters{activeCount > 0 ? ` (${activeCount})` : ''}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-faint">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function CheckRow({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-sm text-fg transition hover:bg-surface-2"
    >
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition',
          checked ? 'border-brand bg-brand-gradient text-white' : 'border-line-strong bg-surface'
        )}
      >
        {checked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
      </span>
      {label}
    </button>
  );
}

export function DashboardToolbar() {
  return (
    <>
      <DateRangeDropdown />
      <FiltersDropdown />
    </>
  );
}
