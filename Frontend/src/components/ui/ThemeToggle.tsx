'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('eoms-theme', next ? 'dark' : 'light');
    } catch {
      /* storage unavailable — theme still applies for the session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted shadow-xs transition hover:border-line-strong hover:text-fg',
        className
      )}
    >
      {mounted ? (
        dark ? <Moon className="h-[18px] w-[18px]" strokeWidth={2} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={2} />
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
