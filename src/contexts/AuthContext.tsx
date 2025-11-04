import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Cache configuration
const CACHE_CONFIG = {
  SESSION_CACHE_KEY: 'idlely_session_cache',
  USER_CACHE_KEY: 'idlely_user_cache',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  GUEST_CACHE_KEY: 'idlely_guest_user',
};

// Cache utilities
const cache = {
  setSession: (session: Session | null) => {
    try {
      if (session) {
        localStorage.setItem(CACHE_CONFIG.SESSION_CACHE_KEY, JSON.stringify({
          session,
          timestamp: Date.now()
        }));
      } else {
        localStorage.removeItem(CACHE_CONFIG.SESSION_CACHE_KEY);
      }
    } catch (error) {
      console.warn('Failed to cache session:', error);
    }
  },

  getSession: () => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.SESSION_CACHE_KEY);
      if (cached) {
        const { session, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_CONFIG.CACHE_DURATION) {
          return session;
        } else {
          localStorage.removeItem(CACHE_CONFIG.SESSION_CACHE_KEY);
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cached session:', error);
    }
    return null;
  },

  setUser: (user: User | GuestUser | null) => {
    try {
      if (user) {
        localStorage.setItem(CACHE_CONFIG.USER_CACHE_KEY, JSON.stringify({
          user,
          timestamp: Date.now()
        }));
      } else {
        localStorage.removeItem(CACHE_CONFIG.USER_CACHE_KEY);
      }
    } catch (error) {
      console.warn('Failed to cache user:', error);
    }
  },

  getUser: () => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.USER_CACHE_KEY);
      if (cached) {
        const { user, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_CONFIG.CACHE_DURATION) {
          return user;
        } else {
          localStorage.removeItem(CACHE_CONFIG.USER_CACHE_KEY);
        }
      }
    } catch (error) {
      console.warn('Failed to retrieve cached user:', error);
    }
    return null;
  },

  setGuest: (guestUser: GuestUser) => {
    try {
      localStorage.setItem(CACHE_CONFIG.GUEST_CACHE_KEY, JSON.stringify(guestUser));
    } catch (error) {
      console.warn('Failed to cache guest user:', error);
    }
  },

  getGuest: (): GuestUser | null => {
    try {
      const cached = localStorage.getItem(CACHE_CONFIG.GUEST_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.warn('Failed to retrieve cached guest:', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(CACHE_CONFIG.SESSION_CACHE_KEY);
      localStorage.removeItem(CACHE_CONFIG.USER_CACHE_KEY);
      localStorage.removeItem(CACHE_CONFIG.GUEST_CACHE_KEY);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
};

interface GuestUser {
  id: string;
  email: string;
  isGuest: true;
}

interface AuthContextType {
  user: User | GuestUser | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  clearAuthCache: () => void;
  dismissGuestBanner: () => void;
  showGuestBanner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | GuestUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [showGuestBanner, setShowGuestBanner] = useState(true);

  useEffect(() => {
    // Load initial session with improved caching
    async function loadSession() {
      try {
        console.log('Loading initial session with cache support...');
        
        // Try to get cached session first
        let session = cache.getSession();
        let user = cache.getUser();
        
        if (session && user && !user.isGuest) {
          console.log('Using cached session and user');
          setSession(session);
          setUser(user);
          setIsGuest(false);
          setLoading(false);
          return;
        }
        
        // If no valid cache, fetch from Supabase
        const { data: { session: freshSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error loading session:', error);
          // Try to restore guest session from cache
          const cachedGuest = cache.getGuest();
          if (cachedGuest) {
            console.log('Restoring guest session from cache');
            setUser(cachedGuest);
            setIsGuest(true);
            setSession(null);
          } else {
            enableGuestMode();
          }
        } else if (freshSession) {
          console.log('Fresh session loaded successfully');
          setSession(freshSession);
          setUser(freshSession.user);
          setIsGuest(false);
          // Cache the successful session
          cache.setSession(freshSession);
          cache.setUser(freshSession.user);
        } else {
          // No session, try guest cache or enable guest mode
          const cachedGuest = cache.getGuest();
          if (cachedGuest) {
            console.log('Restoring guest session from cache');
            setUser(cachedGuest);
            setIsGuest(true);
            setSession(null);
          } else {
            enableGuestMode();
          }
        }
      } catch (error) {
        console.error('Unexpected error loading session:', error);
        // Fallback to guest mode with cache
        const cachedGuest = cache.getGuest();
        if (cachedGuest) {
          setUser(cachedGuest);
          setIsGuest(true);
        } else {
          enableGuestMode();
        }
      } finally {
        setLoading(false);
      }
    }

    // Check if guest banner was dismissed
    const bannerDismissed = sessionStorage.getItem('guestBannerDismissed') === 'true';
    setShowGuestBanner(!bannerDismissed);

    // Only load session if we're not in the middle of server-side rendering
    if (typeof window !== 'undefined') {
      loadSession();
    } else {
      setLoading(false);
    }

    // Only set up auth listener in browser
    if (typeof window !== 'undefined') {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            try {
              console.log('Auth state changed:', event);
              if (session) {
                setSession(session);
                setUser(session.user);
                setIsGuest(false);
                // Cache successful session
                cache.setSession(session);
                cache.setUser(session.user);
              } else {
                // Clear cache and enable guest mode
                cache.setSession(null);
                cache.setUser(null);
                const cachedGuest = cache.getGuest();
                if (cachedGuest) {
                  setUser(cachedGuest);
                  setIsGuest(true);
                } else {
                  enableGuestMode();
                }
              }
            } catch (error) {
              console.error('Error handling auth state change:', error);
            }
          }
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error setting up auth listener:', error);
      }
    }
  }, []);

  const enableGuestMode = () => {
    const guestUser: GuestUser = {
      id: 'guest-' + Date.now(),
      email: 'guest@idlely.app',
      isGuest: true
    };
    setUser(guestUser);
    setIsGuest(true);
    setSession(null);
    // Cache the guest user for persistence
    cache.setGuest(guestUser);
  };

  const clearAuthCache = () => {
    cache.clear();
    setSession(null);
    setUser(null);
    setIsGuest(false);
  };

  const dismissGuestBanner = () => {
    setShowGuestBanner(false);
    sessionStorage.setItem('guestBannerDismissed', 'true');
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      console.error('Error signing in with email:', error);
      return { error: error as AuthError };
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      // Create profile after successful signup
      if (!error && data.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName
          });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }

      return { error };
    } catch (error) {
      console.error('Error signing up with email:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Clear cache on successful signout
      clearAuthCache();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isGuest,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    clearAuthCache,
    dismissGuestBanner,
    showGuestBanner,
  };

  // Don't render children until initial auth check is complete
  // This prevents race conditions in production builds
  if (loading) {
    return (
      <AuthContext.Provider value={value}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // More detailed error for debugging
    console.error('useAuth called outside AuthProvider. Component tree:', {
      location: window.location.href,
      stack: new Error().stack
    });
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}