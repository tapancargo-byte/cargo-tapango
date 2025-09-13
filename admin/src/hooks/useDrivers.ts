import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Driver, DriverWithProfile, DriverInsert, DriverUpdate } from '../lib/supabase';

// Query keys
export const driverKeys = {
  all: ['drivers'] as const,
  lists: () => [...driverKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...driverKeys.lists(), { filters }] as const,
  details: () => [...driverKeys.all, 'detail'] as const,
  detail: (id: string) => [...driverKeys.details(), id] as const,
};

// Fetch drivers with filters
export interface DriverFilters {
  status?: Driver['status'];
  is_online?: boolean;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
}

export function useDrivers(filters: DriverFilters = {}) {
  return useQuery({
    queryKey: driverKeys.list(filters),
    queryFn: async (): Promise<DriverWithProfile[]> => {
      let query = supabase
        .from('drivers')
        .select(`
          *,
          profile:profiles(*)
        `)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.is_online !== undefined) {
        // Map is_online filter to driver status
        const status = filters.is_online ? 'online' : 'offline';
        query = query.eq('status', status);
      }
      // Date range filters on created_at
      const from = (filters as any).fromDate || (filters as any).date_from;
      const to = (filters as any).toDate || (filters as any).date_to;
      if (from) {
        query = query.gte('created_at', from);
      }
      if (to) {
        query = query.lte('created_at', to);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch drivers: ${error.message}`);
      }

      return (data || []).map((driver: any) => ({
        ...driver,
        user_profile: driver.profile,
      }));
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch single driver
export function useDriver(id: string) {
  return useQuery({
    queryKey: driverKeys.detail(id),
    queryFn: async (): Promise<DriverWithProfile | null> => {
      const { data, error } = await supabase
        .from('drivers')
        .select(`
          *,
          profile:profiles(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(`Failed to fetch driver: ${error.message}`);
      }

      return data ? {
        ...data,
        user_profile: data.profile,
      } : null;
    },
    enabled: !!id,
  });
}

// Update driver status
export function useUpdateDriverStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Driver['status'] }): Promise<Driver> => {
      const { data, error } = await (supabase as any)
        .from('drivers')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update driver status: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(data.id) });
    },
  });
}

// Update driver online status
export function useUpdateDriverOnlineStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_online }: { id: string; is_online: boolean }): Promise<Driver> => {
      const { data, error } = await (supabase as any)
        .from('drivers')
        .update({
          is_online,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update driver online status: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(data.id) });
    },
  });
}

// Driver statistics
export function useDriverStats() {
  return useQuery({
    queryKey: [...driverKeys.all, 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('drivers')
        .select('status, rating, total_ratings');

      if (error) {
        throw new Error(`Failed to fetch driver stats: ${error.message}`);
      }

      const stats = {
        total: data.length,
        online: data.filter((d: any) => d.status === 'online').length,
        offline: data.filter((d: any) => d.status === 'offline').length,
        busy: data.filter((d: any) => d.status === 'busy').length,
        break: data.filter((d: any) => d.status === 'break').length,
        avgRating: data.length > 0 ? data.reduce((sum: number, d: any) => sum + (d.rating || 0), 0) / data.length : 0,
        totalRatings: data.reduce((sum: number, d: any) => sum + (d.total_ratings || 0), 0),
      };

      return stats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
