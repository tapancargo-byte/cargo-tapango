import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Order, OrderWithRelations, OrderInsert, OrderUpdate } from '../lib/supabase';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...orderKeys.lists(), { filters }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
};

// Fetch orders with filters
export interface OrderFilters {
  status?: Order['status'];
  customer_id?: string;
  driver_id?: string;
  limit?: number;
  offset?: number;
}

export function useOrders(filters: OrderFilters = {}) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: async (): Promise<OrderWithRelations[]> => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          customer_profile:profiles!orders_customer_id_fkey(*),
          driver_info:drivers(
            *,
            driver_profile:profiles(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }
      if (filters.driver_id) {
        query = query.eq('driver_id', filters.driver_id);
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
      }

      return (data || []).map((order: any) => ({
        ...order,
        customer: order.customer_profile,
        driver: order.driver_info ? {
          ...order.driver_info,
          user_profile: order.driver_info.driver_profile,
        } : null,
        customer_profile: order.customer_profile,
        driver_profile: order.driver_info?.driver_profile || null,
      }));
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch single order
export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: async (): Promise<OrderWithRelations | null> => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer_profile:profiles!orders_customer_id_fkey(*),
          driver_info:drivers(
            *,
            driver_profile:profiles(*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(`Failed to fetch order: ${error.message}`);
      }

      return data ? {
        ...data,
        customer: (data as any).customer_profile,
        driver: (data as any).driver_info ? {
          ...(data as any).driver_info,
          user_profile: (data as any).driver_info.driver_profile,
        } : null,
        customer_profile: (data as any).customer_profile,
        driver_profile: (data as any).driver_info?.driver_profile || null,
      } : null;
    },
    enabled: !!id,
  });
}

// Create order mutation
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: OrderInsert): Promise<Order> => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .insert(order)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create order: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

// Update order mutation
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: OrderUpdate }): Promise<Order> => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update order: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
    },
  });
}

// Assign driver to order
export function useAssignDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, driverId }: { orderId: string; driverId: string }): Promise<Order> => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .update({
          driver_id: driverId,
          status: 'driver_assigned',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to assign driver: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
    },
  });
}

// Cancel order mutation
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string): Promise<Order> => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to cancel order: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
    },
  });
}

// Order statistics
export function useOrderStats() {
  return useQuery({
    queryKey: [...orderKeys.all, 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('status, total_price, created_at');

      if (error) {
        throw new Error(`Failed to fetch order stats: ${error.message}`);
      }

      const stats = {
        total: data.length,
        pending: data.filter((o: any) => o.status === 'pending').length,
        assigned: data.filter((o: any) => o.status === 'driver_assigned').length,
        in_transit: data.filter((o: any) => o.status === 'in_transit').length,
        delivered: data.filter((o: any) => o.status === 'delivered').length,
        cancelled: data.filter((o: any) => o.status === 'cancelled').length,
        totalRevenue: data.filter((o: any) => o.status === 'delivered').reduce((sum: number, o: any) => sum + (o.total_price || 0), 0),
        avgOrderValue: data.length > 0 ? data.reduce((sum: number, o: any) => sum + (o.total_price || 0), 0) / data.length : 0,
      };

      return stats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
