/**
 * Supabase data hooks for admin dashboard
 * Real Supabase integration replacing mock data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, OrderWithRelations, DriverWithProfile, CustomerWithProfile, InvoiceWithOrder } from '../lib/supabase';

// =============================================================================
// Query Keys
// =============================================================================

export const queryKeys = {
  orders: {
    all: () => ['orders'] as const,
    list: (filters?: any) => ['orders', 'list', filters] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  users: {
    all: () => ['users'] as const,
    customers: (filters?: any) => ['users', 'customers', filters] as const,
    drivers: (filters?: any) => ['users', 'drivers', filters] as const,
  },
  invoices: {
    all: () => ['invoices'] as const,
    list: (filters?: any) => ['invoices', 'list', filters] as const,
    detail: (id: string) => ['invoices', 'detail', id] as const,
  },
  notifications: {
    all: () => ['notifications'] as const,
    list: (filters?: any) => ['notifications', 'list', filters] as const,
  },
} as const;

// =============================================================================
// Orders Hooks
// =============================================================================

export const useOrders = (filters?: {
  status?: string;
  customer_id?: string;
  driver_id?: string;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: async (): Promise<OrderWithRelations[]> => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          profiles!orders_customer_id_fkey(*),
          drivers!orders_driver_id_fkey(
            *,
            profiles!drivers_id_fkey(*)
          )
        `);
      
      if (filters?.status) {
        query = query.eq('status', filters.status as any);
      }
      if (filters?.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }
      if (filters?.driver_id) {
        query = query.eq('driver_id', filters.driver_id);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    },
    staleTime: 30 * 1000,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: async (): Promise<OrderWithRelations | null> => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!orders_customer_id_fkey(*),
          drivers!orders_driver_id_fkey(
            *,
            profiles!drivers_id_fkey(*)
          )
        `)
        .eq('id', orderId)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const updateData: any = { 
        status: status as any, 
        updated_at: new Date().toISOString() 
      };
      
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all() });
    },
  });
};

// =============================================================================
// Users/Profiles Hooks  
// =============================================================================

export const useCustomers = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: queryKeys.users.customers(filters),
    queryFn: async (): Promise<CustomerWithProfile[]> => {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'customer');
      
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useDrivers = (filters?: { limit?: number; offset?: number; status?: string }) => {
  return useQuery({
    queryKey: queryKeys.users.drivers(filters),
    queryFn: async (): Promise<DriverWithProfile[]> => {
      let query = supabase
        .from('drivers')
        .select(`
          *,
          profiles!drivers_id_fkey(*)
        `);
      
      if (filters?.status) {
        query = query.eq('status', filters.status as any);
      }
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return (data || []).map((driver: any) => ({
        ...driver,
        user_profile: driver.profiles,
        profile: driver.profiles,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

// =============================================================================
// Invoices Hooks
// =============================================================================

export const useInvoices = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: queryKeys.invoices.list(filters),
    queryFn: async (): Promise<InvoiceWithOrder[]> => {
      let query = supabase
        .from('invoices')
        .select(`
          *,
          orders(*, profiles!orders_customer_id_fkey(*))
        `);
      
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return (data || []).map((invoice: any) => ({
        ...invoice,
        issued_date: invoice.issue_date || invoice.created_at,
        items: invoice.line_items || [],
        customer_profile: invoice.orders?.profiles,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
};

// =============================================================================
// Notifications Hooks
// =============================================================================

export const useNotifications = (filters?: { limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(filters),
    queryFn: async () => {
      let query = supabase
        .from('notifications')
        .select('*');
      
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    },
    staleTime: 30 * 1000,
  });
};

// =============================================================================
// Dashboard Stats Hook
// =============================================================================

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      // Get orders with full data
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('status, total_price');
      
      if (ordersError) throw new Error(ordersError.message);
      
      // Get users count
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('role');
      
      if (usersError) throw new Error(usersError.message);
      
      // Get drivers with status
      const { data: drivers, error: driversError } = await supabase
        .from('drivers')
        .select('status');
      
      if (driversError) throw new Error(driversError.message);
      
      // Type-safe calculations
      const ordersData = orders as Array<{ status: string; total_price: number }> || [];
      const usersData = users as Array<{ role: string }> || [];
      const driversData = drivers as Array<{ status: string }> || [];
      
      const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total_price || 0), 0);
      const totalOrders = ordersData.length;
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const completedOrders = ordersData.filter(order => order.status === 'delivered').length;
      const totalCustomers = usersData.filter(user => user.role === 'customer').length;
      const totalDrivers = driversData.length;
      const onlineDrivers = driversData.filter(driver => driver.status === 'online').length;
      
      // Calculate additional metrics
      const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
      return {
        totalRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalCustomers,
        totalDrivers,
        onlineDrivers,
        completionRate,
        avgOrderValue,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
