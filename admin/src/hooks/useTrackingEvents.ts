import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export interface TrackingEventFilters {
  tracking_code?: string;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
}

export function useTrackingEvents(filters: TrackingEventFilters = {}) {
  return useQuery({
    queryKey: ['tracking_events', { filters }],
    queryFn: async (): Promise<any[]> => {
      let query = (supabase as any)
        .from('tracking_events')
        .select('*')
        .order('created_at', { ascending: false });

      const from = (filters as any).fromDate || (filters as any).date_from;
      const to = (filters as any).toDate || (filters as any).date_to;
      if (from) query = query.gte('created_at', from);
      if (to) query = query.lte('created_at', to);

      // Note: we avoid filtering by tracking_code at the DB level since schema can vary.
      // We'll apply client-side filtering in the page.

      if (filters.limit) query = query.limit(filters.limit);
      if (filters.offset) query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);

      const { data, error } = await query;
      if (error) {
        throw new Error(`Failed to fetch tracking events: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 1000 * 60, // 1 minute
  });
}
