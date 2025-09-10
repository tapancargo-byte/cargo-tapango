import { z } from 'zod';

export const invoiceSchema = z.object({
  id: z.string().optional(),
  order_id: z.string().min(1, 'Order ID is required'),
  customer_id: z.string().min(1, 'Customer ID is required'),
  invoice_number: z.string().min(1, 'Invoice number is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  tax_amount: z.number().min(0, 'Tax amount must be positive'),
  total_amount: z.number().min(0, 'Total amount must be positive'),
  status: z.enum(['draft', 'issued', 'paid', 'overdue', 'void']),
  due_date: z.string().min(1, 'Due date is required'),
  issued_date: z.string().min(1, 'Issued date is required'),
  payment_method: z.enum(['cash', 'card', 'bank_transfer', 'digital_wallet']).optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, 'Item description is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    unit_price: z.number().min(0, 'Unit price must be positive'),
    total_price: z.number().min(0, 'Total price must be positive'),
  })),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const invoiceFormSchema = invoiceSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  created_by: z.string().min(1, 'Created by is required'),
  line_items: z.string().optional(),
  subtotal: z.number().min(0, 'Subtotal must be positive'),
});

export const invoiceFilterSchema = z.object({
  status: z.enum(['all', 'draft', 'issued', 'paid', 'overdue', 'void']).default('all'),
  customer_id: z.string().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  search: z.string().optional(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
export type InvoiceFilters = z.infer<typeof invoiceFilterSchema>;

export const invoiceStatusOptions = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'issued', label: 'Issued', color: 'blue' },
  { value: 'paid', label: 'Paid', color: 'green' },
  { value: 'overdue', label: 'Overdue', color: 'red' },
  { value: 'void', label: 'Void', color: 'gray' },
] as const;

export const paymentMethodOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'digital_wallet', label: 'Digital Wallet' },
] as const;
