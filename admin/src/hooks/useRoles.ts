import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Role, UserRole, systemPermissions } from '../lib/validations/rbac';

// Query keys
export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...roleKeys.lists(), { filters }] as const,
  details: () => [...roleKeys.all, 'detail'] as const,
  detail: (id: string) => [...roleKeys.details(), id] as const,
  userRoles: (userId: string) => [...roleKeys.all, 'user', userId] as const,
};

// Fetch all roles
export function useRoles() {
  return useQuery({
    queryKey: roleKeys.lists(),
    queryFn: async (): Promise<Role[]> => {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');

      if (error) {
        throw new Error(`Failed to fetch roles: ${error.message}`);
      }

      return (data || []).map((role: any) => ({
        ...role,
        description: role.description || undefined,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Fetch single role
export function useRole(id: string) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: async (): Promise<Role | null> => {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw new Error(`Failed to fetch role: ${error.message}`);
      }

      return data ? {
        ...data,
        description: data.description || undefined,
      } : null;
    },
    enabled: !!id,
  });
}

// Fetch user roles
export function useUserRoles(userId: string) {
  return useQuery({
    queryKey: roleKeys.userRoles(userId),
    queryFn: async (): Promise<UserRole[]> => {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          *,
          role:roles(*)
        `)
        .eq('user_id', userId);

      if (error) {
        throw new Error(`Failed to fetch user roles: ${error.message}`);
      }

      return (data || []).map((userRole: any) => ({
        ...userRole,
        assigned_by: userRole.assigned_by || undefined,
        assigned_at: userRole.assigned_at || undefined,
      }));
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get user permissions
export function useUserPermissions(userId: string) {
  const { data: userRoles, isLoading } = useUserRoles(userId);

  return {
    permissions: userRoles?.flatMap((ur: any) => ur.role?.permissions || []) || [],
    isLoading,
    hasPermission: (permission: string) => {
      if (!userRoles) return false;
      return userRoles.some((ur: any) => ur.role?.permissions?.includes(permission));
    },
    hasAnyPermission: (permissions: string[]) => {
      if (!userRoles) return false;
      return permissions.some(permission =>
        userRoles.some((ur: any) => ur.role?.permissions?.includes(permission))
      );
    },
    hasAllPermissions: (permissions: string[]) => {
      if (!userRoles) return false;
      return permissions.every(permission =>
        userRoles.some((ur: any) => ur.role?.permissions?.includes(permission))
      );
    },
  };
}

// Create role mutation
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: Omit<Role, 'id' | 'created_at' | 'updated_at'>): Promise<Role> => {
      const { data, error } = await (supabase as any)
        .from('roles')
        .insert(role)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create role: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
}

// Update role mutation
export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Role> }): Promise<Role> => {
      const { data, error } = await (supabase as any)
        .from('roles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update role: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: roleKeys.detail(data.id) });
      }
    },
  });
}

// Delete role mutation
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      // Check if role is a system role
      const { data: role } = await supabase
        .from('roles')
        .select('is_system_role')
        .eq('id', id)
        .single();

      if ((role as any)?.is_system_role) {
        throw new Error('Cannot delete system roles');
      }

      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete role: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
}

// Assign role to user
export function useAssignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleId, assignedBy }: { 
      userId: string; 
      roleId: string; 
      assignedBy?: string;
    }): Promise<UserRole> => {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .insert({
          user_id: userId,
          role_id: roleId,
          assigned_by: assignedBy,
          assigned_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to assign role: ${error.message}`);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.userRoles(data.user_id) });
    },
  });
}

// Remove role from user
export function useRemoveRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: string; roleId: string }): Promise<void> => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role_id', roleId);

      if (error) {
        throw new Error(`Failed to remove role: ${error.message}`);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.userRoles(variables.userId) });
    },
  });
}

// Get available permissions
export function usePermissions() {
  return {
    data: systemPermissions,
    isLoading: false,
  };
}
