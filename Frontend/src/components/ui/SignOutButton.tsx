'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { Button } from './Button';

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/auth');
    router.refresh();
  }

  return (
    <Button variant="ghost" size="md" loading={loading} onClick={handleSignOut} aria-label="Sign out" className={className}>
      <LogOut className="h-4 w-4" />
      <span>Sign out</span>
    </Button>
  );
}
