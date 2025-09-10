import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Profile, ProfileUpdate } from '../lib/supabase';

// Query keys
export const customerKeys = {
  all: ['customers'] as const,
  lists: () => [...customerKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...customerKeys.lists(), { filters }] as const,
  details: () => [...customerKeys.all, 'detail'] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
};

// Fetch customers with filters
export interface CustomerFilters {
  search?: string;
  limit?: number;
  offset?: number;
}

export function useCustomers(filters: CustomerFilters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: async (): Promise<Profile[]> => {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'customer')
        .order('created_at', { ascending: false });

      if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch customers: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch single customer
export function useCustomer(id: string) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('role', 'customer')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(`Failed to fetch customer: ${error.message}`);
      }

      return data;
    },
    enabled: !!id,
  });
}

// Update customer
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProfileUpdate }): Promise<Profile> => {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update customer: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(data.id) });
    },
  });
}

// Customer statistics
export function useCustomerStats() {
  return useQuery({
    queryKey: [...customerKeys.all, 'stats'],
    queryFn: async () => {
      // Get customer count
      const { data: customers, error: customerError } = await supabase
        .from('profiles')
        .select('id, created_at')
        .eq('role', 'customer');

      if (customerError) {
        throw new Error(`Failed to fetch customer stats: ${customerError.message}`);
      }

      // Get customer orders
      const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('customer_id, total_price, status, created_at');

      if (orderError) {
        throw new Error(`Failed to fetch customer order stats: ${orderError.message}`);
      }

      // Calculate stats
      const totalCustomers = customers.length;
      const activeCustomers = new Set(orders.map((o: any) => o.customer_id)).size;
      const totalOrders = orders.length;
      const totalRevenue = orders.filter((o: any) => o.status === 'delivered').reduce((sum: number, o: any) => sum + (o.total_price || 0), 0);

      const stats = {
        total: totalCustomers,
        active: activeCustomers,
        inactive: totalCustomers - activeCustomers,
        totalOrders,
        totalRevenue,
        avgOrdersPerCustomer: activeCustomers > 0 ? totalOrders / activeCustomers : 0,
        avgRevenuePerCustomer: activeCustomers > 0 ? totalRevenue / activeCustomers : 0,
      };

      return stats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
