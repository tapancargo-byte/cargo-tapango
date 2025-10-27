import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase.gen';

// Direct access so Vite can statically replace these at build/HMR time
const supabaseUrl: string = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey: string = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

const hasUrl = !!supabaseUrl;
const hasKey = !!supabaseAnonKey;
const disabled = !(hasUrl && hasKey);

if (typeof window !== 'undefined') {
  // Minimal diagnostics to help detect misconfigured env during development
  // Do not log secrets
  // eslint-disable-next-line no-console
  console.log('[Supabase] env loaded:', {
    hasUrl,
    hasKey,
    urlPreview: supabaseUrl ? String(supabaseUrl).slice(0, 32) + '…' : null,
    mode: (import.meta as any).env?.MODE,
  });
}

function createStub() {
  const builder: any = {
    select: () => Promise.resolve({ data: [], error: { message: 'Supabase disabled' } }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase disabled' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'Supabase disabled' } }),
    delete: () => Promise.resolve({ data: null, error: { message: 'Supabase disabled' } }),
    order: function () { return this; },
    eq: function () { return this; },
    ilike: function () { return this; },
    gte: function () { return this; },
    lte: function () { return this; },
    limit: function () { return this; },
    range: function () { return this; },
    single: function () { return Promise.resolve({ data: null, error: { code: 'PGRST116', message: 'Supabase disabled' } } as any); },
  };
  const stub: any = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe() {} } } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
    },
    from: () => builder,
  };
  return stub;
}

export const supabase = disabled
  ? (createStub() as ReturnType<typeof createClient<Database>>)
  : createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });

// Export typed table rows for convenience
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific table types
export type Profile = Tables<'profiles'>;
export type Order = Tables<'orders'>;
export type Driver = Tables<'drivers'>;
export type Invoice = Tables<'invoices'>;
export type Notification = Tables<'notifications'>;
export type PushToken = Tables<'push_tokens'>;
export type AppSetting = Tables<'app_settings'>;
export type Role = Tables<'roles'>;
export type UserRole = Tables<'user_roles'>;

export type ProfileInsert = TablesInsert<'profiles'>;
export type OrderInsert = TablesInsert<'orders'>;
export type DriverInsert = TablesInsert<'drivers'>;
export type InvoiceInsert = TablesInsert<'invoices'>;
export type NotificationInsert = TablesInsert<'notifications'>;
export type RoleInsert = TablesInsert<'roles'>;
export type UserRoleInsert = TablesInsert<'user_roles'>;

export type ProfileUpdate = TablesUpdate<'profiles'>;
export type OrderUpdate = TablesUpdate<'orders'>;
export type DriverUpdate = TablesUpdate<'drivers'>;
export type InvoiceUpdate = TablesUpdate<'invoices'>;
export type RoleUpdate = TablesUpdate<'roles'>;
export type UserRoleUpdate = TablesUpdate<'user_roles'>;

// Extended types with relations
export interface OrderWithRelations extends Order {
  customer?: Profile;
  driver?: Driver & { user_profile: Profile };
  customer_profile?: Profile;
  driver_profile?: Profile;
}

export interface DriverWithProfile extends Driver {
  user_profile: Profile;
  profile: Profile;
  vehicle_type?: string;
  vehicle_model?: string;
  vehicle_plate?: string;
  total_trips?: number;
}

export interface InvoiceWithOrder extends Invoice {
  order?: Order | null;
  customer_profile?: Profile;
  issued_date: string;
  payment_method?: 'cash' | 'card' | 'bank_transfer' | 'digital_wallet';
  items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  tax_total: number;
  total_amount: number;
  // Add aliases for form compatibility
  tax_amount: number;
  amount: number;
}

// Add missing customer type
export interface CustomerWithProfile extends Profile {
  total_orders?: number;
  total_spent?: number;
}

// Add compatibility alias for the price field
export interface OrderWithPrice extends Omit<Order, 'total_price'> {
  price: number;
  total_price: number;
}

// Centralized error logger for Supabase queries
export function logSupabaseError(table: string, op: string, error: any, ctx?: Record<string, any>) {
  try {
    // eslint-disable-next-line no-console
    console.error(`[Supabase] ${table}.${op} failed`, {
      code: error?.code,
      message: error?.message,
      details: error?.details,
      hint: error?.hint,
      context: ctx || null,
    });
  } catch {
    // no-op
  }
}
