import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, Profile } from '../lib/supabase';

type User = any;
type Session = any;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let authSubscription: any = null;

    const allowProvisional = ((import.meta as any)?.env?.VITE_ALLOW_PROVISIONAL_ADMIN === '1');

    const mode = (import.meta as any)?.env?.MODE as string | undefined;
    const isProdBuild = mode === 'production';

    // Debug env vars (avoid logging all env keys)
    console.log('🔧 ENV DEBUG:', {
      MODE: mode,
      VITE_DEV_EMERGENCY_ADMIN: (import.meta as any)?.env?.VITE_DEV_EMERGENCY_ADMIN,
      VITE_ALLOW_PROVISIONAL_ADMIN: (import.meta as any)?.env?.VITE_ALLOW_PROVISIONAL_ADMIN,
      hasForceFlag: !!window.localStorage.getItem('FORCE_EMERGENCY_ADMIN')
    });

    // Emergency bypass
    // - Env flag is ignored in production builds (e.g. preview/e2e)
    // - LocalStorage flag FORCE_EMERGENCY_ADMIN=1 always works for explicit test override
    const forceEmergency = (
      (!isProdBuild && (import.meta as any)?.env?.VITE_DEV_EMERGENCY_ADMIN === '1') ||
      window.localStorage.getItem('FORCE_EMERGENCY_ADMIN') === '1'
    );
    
    if (forceEmergency) {
      const emergencyId = 'ebf4ca8c-f112-4da1-89b4-6e1c2fe06cd0';
      console.log('🚀 EMERGENCY BYPASS ACTIVE - BYPASSING ALL AUTH (reason:', (import.meta as any)?.env?.VITE_DEV_EMERGENCY_ADMIN === '1' ? 'env' : 'localStorage', ')');
      if (isMounted) {
        setSession({ user: { id: emergencyId, email: 'cargotapan@gmail.com' } } as any);
        setUser({ id: emergencyId, email: 'cargotapan@gmail.com' } as any);
        setProfile({
          id: emergencyId,
          email: 'cargotapan@gmail.com',
          role: 'super_admin' as const,
          name: 'Super Admin (Emergency)',
          phone: null,
          avatar_url: null,
          address: {},
          preferences: {},
          metadata: {},
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Profile);
        setLoading(false);
      }
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!isMounted) return;
      
      console.log('🔐 Initial session check:', { session: !!session, user: !!session?.user });
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const provisionalEmail = session.user.email as string | undefined;
        if (allowProvisional && provisionalEmail) {
          setProfile({
            id: session.user.id,
            email: provisionalEmail,
            role: (provisionalEmail === 'cargotapan@gmail.com' || provisionalEmail === 'admin@tapango.app') ? ('super_admin' as const) : ('admin' as const),
            name: 'Provisional User',
            phone: null,
            avatar_url: null,
            address: {},
            preferences: {},
            metadata: {},
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Profile);
        }
        fetchProfile(session.user.id, session.user); // non-blocking
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((error: any) => {
      console.error('💥 Error getting initial session:', error);
      if (isMounted) setLoading(false);
    });

    // Listen for auth changes with proper cleanup
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (!isMounted) return;
      // Ignore duplicate INIT event; we already handled getSession()
      if (event === 'INITIAL_SESSION') return;
      
      console.log('🔄 Auth state change:', { event, session: !!session, user: !!session?.user });
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Provisional profile to avoid initial gating while we provision in background
        const provisionalEmail = session.user.email as string | undefined;
        if (allowProvisional && provisionalEmail) {
          setProfile({
            id: session.user.id,
            email: provisionalEmail,
            role: (provisionalEmail === 'cargotapan@gmail.com' || provisionalEmail === 'admin@tapango.app') ? ('super_admin' as const) : ('admin' as const),
            name: 'Provisional User',
            phone: null,
            avatar_url: null,
            address: {},
            preferences: {},
            metadata: {},
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Profile);
        }
        fetchProfile(session.user.id, session.user); // non-blocking
        setLoading(false);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    authSubscription = subscription;

    return () => {
      isMounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const fetchProfile = async (userId: string, userObj?: any) => {
    console.log('🔍 Fetching profile for user:', userId);
    const allowProvisional = ((import.meta as any)?.env?.VITE_ALLOW_PROVISIONAL_ADMIN === '1');
    
    try {
      // Ensure profile exists first (idempotent upsert), then use the ensured row
      const ensured = await ensureProfile(userId, userObj);
      setProfile(ensured);
    } catch (error) {
      console.error('💥 Exception in fetchProfile (ensure first):', error);
      if (allowProvisional) {
        const fallback = await ensureProfile(userId, userObj);
        setProfile(fallback);
      } else {
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const createFallbackProfile = (userId: string) => {
    console.log('🔧 Creating fallback profile for user:', userId);
    
    // Immediate synchronous fallback - no async operations
    const immediateProfile = {
      id: userId,
      email: 'admin@test.com',
      role: 'super_admin' as const,
      name: 'Admin User (Emergency Access)',
      phone: null,
      avatar_url: null,
      address: {},
      preferences: {},
      metadata: {},
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('🚀 EMERGENCY: Using immediate fallback admin profile');
    console.log('📊 Fallback profile:', immediateProfile);
    
    // Force immediate state update
    setProfile(immediateProfile as Profile);
    setLoading(false);
  };

  const ensureProfile = async (userId: string, userObj?: any): Promise<Profile> => {
    console.log('🔧 Ensuring profile exists for:', userId, userObj?.email);
    const allowProvisional = ((import.meta as any)?.env?.VITE_ALLOW_PROVISIONAL_ADMIN === '1');
    
    try {
      let email = userObj?.email as string | undefined;
      let fullName = (userObj?.user_metadata?.full_name as string | undefined) || email;
      if (!email) {
        const { data } = await supabase.auth.getUser();
        email = data?.user?.email || undefined;
        fullName = (data?.user?.user_metadata as any)?.full_name || email;
      }
      
      if (!email) {
        throw new Error('Missing user email for profile ensure');
      }

      // Set role based on email - cargotapan@gmail.com should be super_admin
      const role = (email === 'admin@tapango.app' || email === 'cargotapan@gmail.com') ? ('super_admin' as const) : ('admin' as const);
      
      console.log('🔧 Creating/updating profile with:', { email, role, fullName });
      
      const { data, error } = await (supabase as any)
        .from('profiles')
        .upsert({
          id: userId,
          email,
          name: fullName,
          role,
          phone: null,
          avatar_url: null,
          address: {},
          preferences: {},
          metadata: {},
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      console.log('📝 Profile upsert result:', { data, error });

      if (!error && data) {
        console.log('✅ Profile ensured successfully:', data);
        return data as Profile;
      } else {
        console.error('❌ Failed to ensure profile');
        if (!allowProvisional) throw error || new Error('Profile ensure failed');
        // Provide a fallback profile only if allowed
        return {
          id: userId,
          email: email,
          role,
          name: fullName || email,
          phone: null,
          avatar_url: null,
          address: {},
          preferences: {},
          metadata: {},
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Profile;
      }
    } catch (error) {
      console.error('💥 Exception in ensureProfile:', error);
      if (!allowProvisional) throw error;
      // Provide a fallback only if allowed
      return {
        id: userId,
        email: userObj?.email || 'admin@emergency.local',
        role: 'super_admin' as const,
        name: 'Emergency Admin',
        phone: null,
        avatar_url: null,
        address: {},
        preferences: {},
        metadata: {},
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Profile;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
  const isSuperAdmin = profile?.role === 'super_admin';

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
    isSuperAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
