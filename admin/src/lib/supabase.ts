import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = (import.meta as any)?.env?.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Temporary: Allow development without Supabase for testing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Missing Supabase environment variables - using development mode');
}

const finalUrl = supabaseUrl || 'https://dev.supabase.co';
const finalKey = supabaseAnonKey || 'dev-key';

export const supabase = createClient<Database>(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: !!supabaseUrl,
    persistSession: !!supabaseUrl,
    detectSessionInUrl: !!supabaseUrl
  }
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
  is_online?: boolean;
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
