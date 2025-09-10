import { z } from 'zod';

// Order validation schemas
export const orderSchema = z.object({
  customer_id: z.string().min(1, 'Customer is required'),
  pickup_address: z.string().min(1, 'Pickup address is required'),
  delivery_address: z.string().min(1, 'Delivery address is required'),
  pickup_location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  delivery_location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  package_details: z.object({
    weight: z.number().min(0.1, 'Weight must be at least 0.1 kg'),
    dimensions: z.object({
      length: z.number().min(1),
      width: z.number().min(1),
      height: z.number().min(1),
    }),
    description: z.string().min(1, 'Package description is required'),
    value: z.number().min(0),
  }),
  price: z.number().min(0, 'Price must be positive'),
  estimated_delivery: z.string().optional(),
  notes: z.string().optional(),
});

export const orderUpdateSchema = orderSchema.partial().extend({
  id: z.string(),
  status: z.enum(['pending', 'confirmed', 'driver_assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled']).optional(),
  driver_id: z.string().nullable().optional(),
});

// Driver validation schemas
export const driverSchema = z.object({
  user_id: z.string().min(1, 'User is required'),
  license_number: z.string().min(1, 'License number is required'),
  vehicle_type: z.string().min(1, 'Vehicle type is required'),
  vehicle_model: z.string().optional(),
  vehicle_plate: z.string().optional(),
});

export const driverUpdateSchema = driverSchema.partial().extend({
  id: z.string(),
  status: z.enum(['pending', 'approved', 'suspended', 'rejected']).optional(),
  is_online: z.boolean().optional(),
});

// Customer validation schemas
export const customerSchema = z.object({
  email: z.string().email('Invalid email address'),
  full_name: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['customer', 'driver', 'admin', 'super_admin']).default('customer'),
});

export const customerUpdateSchema = customerSchema.partial().extend({
  id: z.string(),
});

// Invoice validation schemas
export const invoiceSchema = z.object({
  order_id: z.string().min(1, 'Order is required'),
  customer_id: z.string().min(1, 'Customer is required'),
  invoice_number: z.string().min(1, 'Invoice number is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  tax_amount: z.number().min(0, 'Tax amount must be positive'),
  total_amount: z.number().min(0, 'Total amount must be positive'),
  due_date: z.string().min(1, 'Due date is required'),
  line_items: z.any().optional(),
});

export const invoiceUpdateSchema = invoiceSchema.partial().extend({
  id: z.string(),
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
});

// Settings validation schemas
export const settingSchema = z.object({
  key: z.string().min(1, 'Setting key is required'),
  value: z.any(),
  description: z.string().optional(),
});

// Filter schemas
export const orderFiltersSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'driver_assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled']).optional(),
  customer_id: z.string().optional(),
  driver_id: z.string().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const driverFiltersSchema = z.object({
  status: z.enum(['offline', 'online', 'busy', 'break']).optional(),
  is_online: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const customerFiltersSchema = z.object({
  role: z.enum(['customer', 'driver', 'admin', 'super_admin']).optional(),
  search: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const invoiceFiltersSchema = z.object({
  status: z.enum(['draft', 'sent', 'paid', 'overdue', 'cancelled']).optional(),
  customer_id: z.string().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

// Type exports
export type OrderFormData = z.infer<typeof orderSchema>;
export type OrderUpdateFormData = z.infer<typeof orderUpdateSchema>;
export type DriverFormData = z.infer<typeof driverSchema>;
export type DriverUpdateFormData = z.infer<typeof driverUpdateSchema>;
export type CustomerFormData = z.infer<typeof customerSchema>;
export type CustomerUpdateFormData = z.infer<typeof customerUpdateSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;
export type InvoiceUpdateFormData = z.infer<typeof invoiceUpdateSchema>;
export type SettingFormData = z.infer<typeof settingSchema>;
export type OrderFilters = z.infer<typeof orderFiltersSchema>;
export type DriverFilters = z.infer<typeof driverFiltersSchema>;
export type CustomerFilters = z.infer<typeof customerFiltersSchema>;
export type InvoiceFilters = z.infer<typeof invoiceFiltersSchema>;
