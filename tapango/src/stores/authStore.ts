import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { AuthProfile } from '@/services/authService';

export interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  profile: AuthProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: AuthProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearAuth: () => void;
  updateProfile: (updates: Partial<AuthProfile>) => void;
}

/**
 * Authentication state store using Zustand
 *
 * Manages global authentication state including user, session, and profile data.
 * Provides actions to update state and derived state selectors for performance.
 *
 * @example
 * ```typescript
 * // In component
 * const { user, loading, setUser } = useAuthStore();
 *
 * // With selector for performance
 * const isAuthenticated = useAuthStore(state => !!state.user);
 * ```
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  initialized: false,

  // Actions
  setUser: (user) => {
    set({ user });

    // Clear profile when user changes
    if (!user) {
      set({ profile: null });
    }
  },

  setSession: (session) => {
    set({ session });

    // Update user when session changes
    const newUser = session?.user ?? null;
    if (get().user?.id !== newUser?.id) {
      set({ user: newUser });

      // Clear profile if user changed
      if (!newUser) {
        set({ profile: null });
      }
    }
  },

  setProfile: (profile) => {
    set({ profile });
  },

  setLoading: (loading) => {
    set({ loading });
  },

  setError: (error) => {
    set({ error });
  },

  setInitialized: (initialized) => {
    set({ initialized });
  },

  clearAuth: () => {
    set({
      user: null,
      session: null,
      profile: null,
      loading: false,
      error: null,
    });
  },

  updateProfile: (updates) => {
    const currentProfile = get().profile;
    if (currentProfile) {
      set({
        profile: {
          ...currentProfile,
          ...updates,
          updatedAt: new Date().toISOString(),
        },
      });
    }
  },
}));

// Selectors for performance optimization
export const selectAuthUser = (state: AuthState) => state.user;
export const selectAuthProfile = (state: AuthState) => state.profile;
export const selectAuthLoading = (state: AuthState) => state.loading;
export const selectAuthError = (state: AuthState) => state.error;
export const selectAuthInitialized = (state: AuthState) => state.initialized;

// Derived selectors
export const selectIsAuthenticated = (state: AuthState) =>
  !!state.user && !!state.session;

export const selectUserRole = (state: AuthState) => state.profile?.role ?? null;

export const selectUserDisplayName = (state: AuthState) =>
  state.profile ? `${state.profile.firstName} ${state.profile.lastName}` : null;

export const selectIsAdmin = (state: AuthState) =>
  state.profile?.role === 'admin';

export const selectIsDriver = (state: AuthState) =>
  state.profile?.role === 'driver';

export const selectIsCustomer = (state: AuthState) =>
  state.profile?.role === 'customer';

// Utility hook for common auth operations
export const useAuthActions = () => {
  const store = useAuthStore();

  return {
    setUser: store.setUser,
    setSession: store.setSession,
    setProfile: store.setProfile,
    setLoading: store.setLoading,
    setError: store.setError,
    setInitialized: store.setInitialized,
    clearAuth: store.clearAuth,
    updateProfile: store.updateProfile,
  };
};

// Hook for auth state without actions (performance optimized)
export const useAuthState = () => {
  return useAuthStore((state) => ({
    user: state.user,
    session: state.session,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    initialized: state.initialized,
    isAuthenticated: selectIsAuthenticated(state),
    userRole: selectUserRole(state),
    displayName: selectUserDisplayName(state),
    isAdmin: selectIsAdmin(state),
    isDriver: selectIsDriver(state),
    isCustomer: selectIsCustomer(state),
  }));
};
