import * as SecureStore from 'expo-secure-store';
import { z } from 'zod';

// Environment configuration
const supabaseUrl = '';
const supabaseAnonKey = '';

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

type SupaUser = any;
type SupaSession = any;
type SupaAuthError = any;

export interface AuthResult {
  user: SupaUser | null;
  session: SupaSession | null;
  error: SupaAuthError | CustomAuthError | null;
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
  private currentUser: SupaUser | null = null;
  private currentSession: SupaSession | null = null;

  constructor() {}

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

      const authError: CustomAuthError = {
        name: 'SignInDisabled',
        message: 'Supabase has been removed. Authentication is disabled.',
      };
      return { user: null, session: null, error: authError };
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

      const authError: CustomAuthError = {
        name: 'SignUpDisabled',
        message: 'Supabase has been removed. Registration is disabled.',
      };
      return { user: null, session: null, error: authError };
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
  async signOut(): Promise<{ error: SupaAuthError | CustomAuthError | null }> {
    try {
      const authError: CustomAuthError | null = null;
      this.currentUser = null;
      this.currentSession = null;
      return { error: authError };
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
  async resetPassword(
    data: ResetPasswordData
  ): Promise<{ error: SupaAuthError | CustomAuthError | null }> {
    try {
      // Validate input
      const validatedData = ResetPasswordSchema.parse(data);

      const authError: CustomAuthError = {
        name: 'ResetDisabled',
        message: 'Supabase has been removed. Password reset is disabled.',
      };
      return { error: authError };
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
  getCurrentUser(): SupaUser | null {
    return this.currentUser;
  }

  /**
   * Get current session
   *
   * @returns Current session or null
   */
  getCurrentSession(): SupaSession | null {
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
  async getUserProfile(): Promise<{
    data: AuthProfile | null;
    error: Error | null;
  }> {
    try {
      if (!this.currentUser) {
        return { data: null, error: new Error('User not authenticated') };
      }

      return { data: null, error: new Error('Supabase has been removed.') };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error ? error : new Error('Failed to fetch profile'),
      };
    }
  }

  /**
   * Update user profile
   *
   * @param updates - Profile fields to update
   * @returns Promise resolving to updated profile
   */
  async updateProfile(
    updates: Partial<Omit<AuthProfile, 'id' | 'email' | 'createdAt'>>
  ): Promise<{
    data: AuthProfile | null;
    error: Error | null;
  }> {
    try {
      if (!this.currentUser) {
        return { data: null, error: new Error('User not authenticated') };
      }

      return { data: null, error: new Error('Supabase has been removed.') };
    } catch (error) {
      return {
        data: null,
        error:
          error instanceof Error
            ? error
            : new Error('Failed to update profile'),
      };
    }
  }

  /**
   * Refresh authentication token
   *
   * @returns Promise resolving to new session
   */
  async refreshSession(): Promise<{
    session: SupaSession | null;
    error: SupaAuthError | CustomAuthError | null;
  }> {
    try {
      const authError: CustomAuthError = {
        name: 'RefreshDisabled',
        message: 'Supabase has been removed. Token refresh is disabled.',
      };
      return { session: null, error: authError };
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
