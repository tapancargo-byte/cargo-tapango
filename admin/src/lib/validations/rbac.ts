import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Role name is required'),
  description: z.string().optional(),
  permissions: z.array(z.string()),
  is_system_role: z.boolean().default(false),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const userRoleSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().min(1, 'User ID is required'),
  role_id: z.string().min(1, 'Role ID is required'),
  assigned_by: z.string().optional(),
  assigned_at: z.string().optional(),
});

export const permissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  resource: z.string(),
  action: z.string(),
});

export type Role = z.infer<typeof roleSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type Permission = z.infer<typeof permissionSchema>;

// Predefined permissions for the system
export const systemPermissions = [
  // Dashboard
  { id: 'dashboard.view', name: 'View Dashboard', description: 'Access to main dashboard', resource: 'dashboard', action: 'view' },
  
  // Orders
  { id: 'orders.view', name: 'View Orders', description: 'View order list and details', resource: 'orders', action: 'view' },
  { id: 'orders.create', name: 'Create Orders', description: 'Create new orders', resource: 'orders', action: 'create' },
  { id: 'orders.edit', name: 'Edit Orders', description: 'Edit existing orders', resource: 'orders', action: 'edit' },
  { id: 'orders.delete', name: 'Delete Orders', description: 'Delete orders', resource: 'orders', action: 'delete' },
  { id: 'orders.assign', name: 'Assign Orders', description: 'Assign orders to drivers', resource: 'orders', action: 'assign' },
  
  // Drivers
  { id: 'drivers.view', name: 'View Drivers', description: 'View driver list and details', resource: 'drivers', action: 'view' },
  { id: 'drivers.create', name: 'Create Drivers', description: 'Add new drivers', resource: 'drivers', action: 'create' },
  { id: 'drivers.edit', name: 'Edit Drivers', description: 'Edit driver information', resource: 'drivers', action: 'edit' },
  { id: 'drivers.delete', name: 'Delete Drivers', description: 'Remove drivers', resource: 'drivers', action: 'delete' },
  { id: 'drivers.manage_status', name: 'Manage Driver Status', description: 'Change driver status and availability', resource: 'drivers', action: 'manage_status' },
  
  // Customers
  { id: 'customers.view', name: 'View Customers', description: 'View customer list and details', resource: 'customers', action: 'view' },
  { id: 'customers.create', name: 'Create Customers', description: 'Add new customers', resource: 'customers', action: 'create' },
  { id: 'customers.edit', name: 'Edit Customers', description: 'Edit customer information', resource: 'customers', action: 'edit' },
  { id: 'customers.delete', name: 'Delete Customers', description: 'Remove customers', resource: 'customers', action: 'delete' },
  
  // Invoices
  { id: 'invoices.view', name: 'View Invoices', description: 'View invoice list and details', resource: 'invoices', action: 'view' },
  { id: 'invoices.create', name: 'Create Invoices', description: 'Create new invoices', resource: 'invoices', action: 'create' },
  { id: 'invoices.edit', name: 'Edit Invoices', description: 'Edit existing invoices', resource: 'invoices', action: 'edit' },
  { id: 'invoices.delete', name: 'Delete Invoices', description: 'Delete invoices', resource: 'invoices', action: 'delete' },
  { id: 'invoices.mark_paid', name: 'Mark Invoices Paid', description: 'Mark invoices as paid', resource: 'invoices', action: 'mark_paid' },
  
  // Analytics
  { id: 'analytics.view', name: 'View Analytics', description: 'Access analytics and reports', resource: 'analytics', action: 'view' },
  { id: 'analytics.export', name: 'Export Analytics', description: 'Export analytics data', resource: 'analytics', action: 'export' },
  
  // Settings
  { id: 'settings.view', name: 'View Settings', description: 'View system settings', resource: 'settings', action: 'view' },
  { id: 'settings.edit', name: 'Edit Settings', description: 'Modify system settings', resource: 'settings', action: 'edit' },
  
  // User Management (Admin only)
  { id: 'users.view', name: 'View Users', description: 'View user list and details', resource: 'users', action: 'view' },
  { id: 'users.create', name: 'Create Users', description: 'Add new users', resource: 'users', action: 'create' },
  { id: 'users.edit', name: 'Edit Users', description: 'Edit user information', resource: 'users', action: 'edit' },
  { id: 'users.delete', name: 'Delete Users', description: 'Remove users', resource: 'users', action: 'delete' },
  
  // Role Management (Super Admin only)
  { id: 'roles.view', name: 'View Roles', description: 'View role list and details', resource: 'roles', action: 'view' },
  { id: 'roles.create', name: 'Create Roles', description: 'Create new roles', resource: 'roles', action: 'create' },
  { id: 'roles.edit', name: 'Edit Roles', description: 'Edit existing roles', resource: 'roles', action: 'edit' },
  { id: 'roles.delete', name: 'Delete Roles', description: 'Delete roles', resource: 'roles', action: 'delete' },
  { id: 'roles.assign', name: 'Assign Roles', description: 'Assign roles to users', resource: 'roles', action: 'assign' },
] as const;

// Predefined roles
export const systemRoles = [
  {
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: systemPermissions.map(p => p.id),
    is_system_role: true,
  },
  {
    name: 'Admin',
    description: 'Administrative access with most permissions',
    permissions: systemPermissions.filter(p => !p.id.startsWith('roles.')).map(p => p.id),
    is_system_role: true,
  },
  {
    name: 'Manager',
    description: 'Management access to orders, drivers, and customers',
    permissions: [
      'dashboard.view',
      'orders.view', 'orders.create', 'orders.edit', 'orders.assign',
      'drivers.view', 'drivers.edit', 'drivers.manage_status',
      'customers.view', 'customers.create', 'customers.edit',
      'invoices.view', 'invoices.create', 'invoices.edit', 'invoices.mark_paid',
      'analytics.view',
    ],
    is_system_role: true,
  },
  {
    name: 'Operator',
    description: 'Basic operational access to orders and drivers',
    permissions: [
      'dashboard.view',
      'orders.view', 'orders.edit', 'orders.assign',
      'drivers.view', 'drivers.manage_status',
      'customers.view',
      'invoices.view',
    ],
    is_system_role: true,
  },
  {
    name: 'Viewer',
    description: 'Read-only access to most resources',
    permissions: [
      'dashboard.view',
      'orders.view',
      'drivers.view',
      'customers.view',
      'invoices.view',
      'analytics.view',
    ],
    is_system_role: true,
  },
] as const;
