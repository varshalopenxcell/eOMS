import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';

export type CurrentUser = {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user as CurrentUser | null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as CurrentUser) ?? null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
