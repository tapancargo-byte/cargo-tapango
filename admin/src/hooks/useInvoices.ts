import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Invoice, InvoiceWithOrder, InvoiceInsert, InvoiceUpdate } from '../lib/supabase';

// Query keys
export const invoiceKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...invoiceKeys.lists(), { filters }] as const,
  details: () => [...invoiceKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
};

// Fetch invoices with filters
export interface InvoicesQueryFilters {
  status?: Invoice['status'];
  customer_id?: string;
  date_from?: string;
  date_to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export function useInvoices(filters: InvoicesQueryFilters = {}) {
  return useQuery({
    queryKey: invoiceKeys.list(filters),
    queryFn: async (): Promise<InvoiceWithOrder[]> => {
      let query = supabase
        .from('invoices')
        .select(`
          *,
          order:orders(*),
          customer_profile:profiles!invoices_customer_id_fkey(*)
        `)
        .order('created_at', { ascending: false });

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.customer_id) {
        query = query.eq('customer_id', filters.customer_id);
      }
      // Date range filters (issue_date preferred, fallback to created_at)
      const from = (filters as any).fromDate || (filters as any).date_from;
      const to = (filters as any).toDate || (filters as any).date_to;
      if (from) {
        // Filter against issue_date if available, otherwise created_at
        query = query.gte('issue_date', from);
      }
      if (to) {
        query = query.lte('issue_date', to);
      }

      // Basic search on invoice number
      if ((filters as any).search && (filters as any).search.trim()) {
        query = query.ilike('invoice_number', `%${(filters as any).search.trim()}%`);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch invoices: ${error.message}`);
      }

      return (data || []).map((invoice: any) => ({
        ...invoice,
        issued_date: invoice.issue_date || invoice.created_at || '',
        items: (invoice.line_items as any) || [],
        customer_profile: invoice.customer_profile,
        tax_total: invoice.tax_total || 0,
        total_amount: invoice.total_amount || 0,
        // Add aliases for form compatibility
        tax_amount: invoice.tax_total || 0,
        amount: invoice.total_amount || 0,
      }));
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// Fetch single invoice
export function useInvoice(id: string) {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: async (): Promise<InvoiceWithOrder | null> => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          order:orders(*),
          customer_profile:profiles!invoices_customer_id_fkey(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(`Failed to fetch invoice: ${error.message}`);
      }

      return data ? {
        ...data,
        issued_date: data.issue_date || data.created_at || '',
        items: (data.line_items as any) || [],
        customer_profile: data.customer_profile,
        order: data.order || null,
        tax_total: data.tax_total || 0,
        total_amount: data.total_amount || 0,
        // Add aliases for form compatibility
        tax_amount: data.tax_total || 0,
        amount: data.total_amount || 0,
      } as InvoiceWithOrder : null;
    },
    enabled: !!id,
  });
}

// Create invoice mutation
export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoice: InvoiceInsert): Promise<Invoice> => {
      const { data, error } = await (supabase as any)
        .from('invoices')
        .insert(invoice)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create invoice: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
    },
  });
}

// Update invoice mutation
export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: InvoiceUpdate }): Promise<Invoice> => {
      const { data, error } = await (supabase as any)
        .from('invoices')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update invoice: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(data.id) });
    },
  });
}

// Mark invoice as paid
export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceId: string): Promise<Invoice> => {
      const { data, error } = await (supabase as any)
        .from('invoices')
        .update({
          status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', invoiceId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to mark invoice as paid: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: invoiceKeys.detail(data.id) });
    },
  });
}

// Invoice statistics
export function useInvoiceStats() {
  return useQuery({
    queryKey: [...invoiceKeys.all, 'stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('status, total_amount, created_at, due_date');

      if (error) {
        throw new Error(`Failed to fetch invoice stats: ${error.message}`);
      }

      const now = new Date();
      const overdue = data.filter((i: any) =>
        i.status !== 'paid' &&
        i.status !== 'cancelled' &&
        new Date(i.due_date) < now
      );

      const stats = {
        total: data.length,
        draft: data.filter((i: any) => i.status === 'draft').length,
        sent: data.filter((i: any) => i.status === 'sent').length,
        paid: data.filter((i: any) => i.status === 'paid').length,
        overdue: overdue.length,
        cancelled: data.filter((i: any) => i.status === 'cancelled').length,
        totalAmount: data.reduce((sum: number, i: any) => sum + i.total_amount, 0),
        paidAmount: data.filter((i: any) => i.status === 'paid').reduce((sum: number, i: any) => sum + i.total_amount, 0),
        pendingAmount: data.filter((i: any) => i.status === 'sent').reduce((sum: number, i: any) => sum + i.total_amount, 0),
        overdueAmount: overdue.reduce((sum: number, i: any) => sum + i.total_amount, 0),
      };

      return stats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
