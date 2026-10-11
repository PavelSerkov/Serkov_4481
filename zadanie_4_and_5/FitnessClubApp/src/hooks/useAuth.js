import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      setUser(error ? null : data.session?.user ?? null);
      setIsLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isActive) {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    });

    loadSession();

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const runAuthAction = async (action) => {
    setIsLoading(true);

    try {
      const { data, error } = await action();

      if (error) {
        throw error;
      }

      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = (email, password) => runAuthAction(() => (
    supabase.auth.signUp({ email, password })
  ));

  const signIn = (email, password) => runAuthAction(() => (
    supabase.auth.signInWithPassword({ email, password })
  ));

  const signOut = () => runAuthAction(() => supabase.auth.signOut());

  return { user, isLoading, signUp, signIn, signOut };
}

export default useAuth;
