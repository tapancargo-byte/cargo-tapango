import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

// Query keys
export const analyticsKeys = {
  all: ['analytics'] as const,
  dashboard: () => [...analyticsKeys.all, 'dashboard'] as const,
  revenue: (period: string) => [...analyticsKeys.all, 'revenue', period] as const,
  orders: (period: string) => [...analyticsKeys.all, 'orders', period] as const,
};

export interface DashboardMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalDrivers: number;
  onlineDrivers: number;
  avgOrderValue: number;
  completionRate: number;
  revenueTrend: Array<{ date: string; revenue: number }>;
  orderStatusData: Array<{ name: string; value: number; color: string }>;
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: async (): Promise<DashboardMetrics> => {
      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('status, total_price, created_at') as any;

      if (ordersError) {
        throw new Error(`Failed to fetch orders: ${ordersError.message}`);
      }

      // Fetch customers
      const { data: customers, error: customersError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'customer') as any;

      if (customersError) {
        throw new Error(`Failed to fetch customers: ${customersError.message}`);
      }

      // Fetch drivers
      const { data: drivers, error: driversError } = await supabase
        .from('drivers')
        .select('id, is_online') as any;

      if (driversError) {
        throw new Error(`Failed to fetch drivers: ${driversError.message}`);
      }

      // Calculate metrics
      const totalOrders = orders.length;
      const deliveredOrders = orders.filter((o: any) => o.status === 'delivered');
      const totalRevenue = deliveredOrders.reduce((sum: number, o: any) => sum + (o.total_price || 0), 0);
      const avgOrderValue = totalOrders > 0 ? orders.reduce((sum: number, o: any) => sum + (o.total_price || 0), 0) / totalOrders : 0;
      const completionRate = totalOrders > 0 ? (deliveredOrders.length / totalOrders) * 100 : 0;

      // Revenue trend (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const revenueTrend = last7Days.map(date => {
        const dayRevenue = deliveredOrders
          .filter((o: any) => o.created_at.startsWith(date))
          .reduce((sum: number, o: any) => sum + (o.total_price || 0), 0);
        return { date, revenue: dayRevenue };
      });

      // Order status distribution
      const statusColors = {
        pending: '#f59e0b',
        assigned: '#3b82f6',
        picked_up: '#8b5cf6',
        in_transit: '#06b6d4',
        delivered: '#10b981',
        cancelled: '#ef4444',
      };

      const orderStatusData = Object.entries(
        orders.reduce((acc: Record<string, number>, order: any) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([status, count]) => ({
        name: status.replace('_', ' ').toUpperCase(),
        value: count as number,
        color: statusColors[status as keyof typeof statusColors] || '#6b7280',
      }));

      return {
        totalOrders,
        totalRevenue,
        totalCustomers: customers.length,
        totalDrivers: drivers.length,
        onlineDrivers: drivers.filter((d: any) => d.is_online).length,
        avgOrderValue,
        completionRate,
        revenueTrend,
        orderStatusData,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRevenueAnalytics(period: 'daily' | 'weekly' | 'monthly' = 'daily') {
  return useQuery({
    queryKey: analyticsKeys.revenue(period),
    queryFn: async () => {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_price, created_at, status')
        .eq('status', 'delivered')
        .order('created_at', { ascending: true }) as any;

      if (error) {
        throw new Error(`Failed to fetch revenue data: ${error.message}`);
      }

      // Group by period
      const groupedData = orders.reduce((acc: Record<string, { revenue: number; orders: number }>, order: any) => {
        const date = new Date(order.created_at);
        let key: string;

        switch (period) {
          case 'daily':
            key = date.toISOString().split('T')[0];
            break;
          case 'weekly':
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            key = weekStart.toISOString().split('T')[0];
            break;
          case 'monthly':
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            break;
          default:
            key = date.toISOString().split('T')[0];
        }

        if (!acc[key]) {
          acc[key] = { revenue: 0, orders: 0 };
        }
        acc[key].revenue += order.total_price || 0;
        acc[key].orders += 1;

        return acc;
      }, {} as Record<string, { revenue: number; orders: number }>);

      return Object.entries(groupedData).map(([date, data]) => ({
        date,
        revenue: (data as any).revenue,
        orders: (data as any).orders,
      }));
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
