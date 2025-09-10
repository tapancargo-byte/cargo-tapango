import { createClient, SupabaseClient, User, Session, AuthError } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

// Environment configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

// Validation schemas
const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  role: z.enum(['customer', 'driver', 'admin']).default('customer'),
});

const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Types
export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

// Custom AuthError interface that's compatible
interface CustomAuthError {
  name: string;
  message: string;
  code?: string;
  status?: number;
  __isAuthError?: boolean;
}

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | CustomAuthError | null;
}

export interface AuthProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'driver' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication service handling user authentication and profile management
 * 
 * Features:
 * - Email/password authentication
 * - Secure token storage
 * - User profile management
 * - Role-based access control
 * - Input validation
 * - Error handling
 */
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: User | null = null;
  private currentSession: Session | null = null;

  constructor() {
    this.supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        storage: {
          getItem: (key: string) => SecureStore.getItemAsync(key),
          setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
          removeItem: (key: string) => SecureStore.deleteItemAsync(key),
        },
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });

    // Listen to auth changes
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      this.currentSession = session;
      this.currentUser = session?.user ?? null;
      
      if (event === 'SIGNED_OUT') {
        await this.clearStoredData();
      }
    });
  }

  /**
   * Sign in user with email and password
   * 
   * @param credentials - User sign in credentials
   * @returns Promise resolving to auth result
   * 
   * @example
   * ```typescript
   * const result = await authService.signIn({
   *   email: 'user@example.com',
   *   password: 'securepassword'
   * });
   * 
   * if (result.error) {
   *   console.error('Sign in failed:', result.error.message);
   * } else {
   *   console.log('Welcome', result.user?.email);
   * }
   * ```
   */
  async signIn(credentials: SignInData): Promise<AuthResult> {
    try {
      // Validate input
      const validatedData = SignInSchema.parse(credentials);
      
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        return { user: null, session: null, error };
      }

      return { 
        user: data.user, 
        session: data.session, 
        error: null 
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const authError: CustomAuthError = {
          name: 'ValidationError',
          message: error.errors[0]?.message ?? 'Invalid input',
        };
        return { user: null, session: null, error: authError };
      }
      
      const authError: CustomAuthError = {
        name: 'SignInError',
        message: 'Sign in failed. Please try again.',
      };
      return { user: null, session: null, error: authError };
    }
  }

  /**
   * Sign up new user with email and password
   * 
   * @param userData - User registration data
   * @returns Promise resolving to auth result
   */
  async signUp(userData: SignUpData): Promise<AuthResult> {
    try {
      // Validate input
      const validatedData = SignUpSchema.parse(userData);
      
      const { data, error } = await this.supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            phone: validatedData.phone,
            role: validatedData.role,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error };
      }

      return { 
        user: data.user, 
        session: data.session, 
        error: null 
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const authError: CustomAuthError = {
          name: 'ValidationError',
          message: error.errors[0]?.message ?? 'Invalid input',
        };
        return { user: null, session: null, error: authError };
      }
      
      const authError: CustomAuthError = {
        name: 'SignUpError',
        message: 'Sign up failed. Please try again.',
      };
      return { user: null, session: null, error: authError };
    }
  }

  /**
   * Sign out current user
   * 
   * @returns Promise resolving when sign out completes
   */
  async signOut(): Promise<{ error: AuthError | CustomAuthError | null }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      return { error };
    } catch (error) {
      const authError: CustomAuthError = {
        name: 'SignOutError',
        message: 'Sign out failed. Please try again.',
      };
      return { error: authError };
    }
  }

  /**
   * Request password reset email
   * 
   * @param data - Reset password data
   * @returns Promise resolving when reset email is sent
   */
  async resetPassword(data: ResetPasswordData): Promise<{ error: AuthError | CustomAuthError | null }> {
    try {
      // Validate input
      const validatedData = ResetPasswordSchema.parse(data);
      
      const { error } = await this.supabase.auth.resetPasswordForEmail(
        validatedData.email,
        {
          redirectTo: 'tapango://reset-password',
        }
      );

      return { error };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const authError: CustomAuthError = {
          name: 'ValidationError',
          message: error.errors[0]?.message ?? 'Invalid email',
        };
        return { error: authError };
      }
      
      const authError: CustomAuthError = {
        name: 'ResetPasswordError',
        message: 'Password reset failed. Please try again.',
      };
      return { error: authError };
    }
  }

  /**
   * Get current authenticated user
   * 
   * @returns Current user or null
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Get current session
   * 
   * @returns Current session or null
   */
  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  /**
   * Check if user is authenticated
   * 
   * @returns True if user is signed in
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.currentSession !== null;
  }

  /**
   * Get user profile data
   * 
   * @returns Promise resolving to user profile
   */
  async getUserProfile(): Promise<{ data: AuthProfile | null; error: Error | null }> {
    try {
      if (!this.currentUser) {
        return { data: null, error: new Error('User not authenticated') };
      }

      const { data, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', this.currentUser.id)
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Failed to fetch profile')
      };
    }
  }

  /**
   * Update user profile
   * 
   * @param updates - Profile fields to update
   * @returns Promise resolving to updated profile
   */
  async updateProfile(updates: Partial<Omit<AuthProfile, 'id' | 'email' | 'createdAt'>>): Promise<{ 
    data: AuthProfile | null; 
    error: Error | null 
  }> {
    try {
      if (!this.currentUser) {
        return { data: null, error: new Error('User not authenticated') };
      }

      const { data, error } = await this.supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', this.currentUser.id)
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Failed to update profile')
      };
    }
  }

  /**
   * Refresh authentication token
   * 
   * @returns Promise resolving to new session
   */
  async refreshSession(): Promise<{ session: Session | null; error: AuthError | CustomAuthError | null }> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      return { session: data.session, error };
    } catch (error) {
      const authError: CustomAuthError = {
        name: 'RefreshTokenError',
        message: 'Token refresh failed',
      };
      return { session: null, error: authError };
    }
  }

  /**
   * Clear all stored authentication data
   * 
   * @private
   */
  private async clearStoredData(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('supabase.auth.token');
      this.currentUser = null;
      this.currentSession = null;
    } catch (error) {
      console.error('Error clearing stored auth data:', error);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
