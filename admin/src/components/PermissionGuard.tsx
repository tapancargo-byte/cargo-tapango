import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserPermissions } from '../hooks/useRoles';
import { useAuth } from '../providers/AuthProvider';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Shield } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  permissions = [],
  requireAll = false,
  fallback,
  redirectTo = '/unauthorized',
}) => {
  const { user } = useAuth();
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading } = useUserPermissions(user?.id || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions.length > 0) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
  } else {
    hasAccess = true; // No permissions required
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }

    return (
      <div className="flex items-center justify-center h-64">
        <Alert className="max-w-md">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

// Higher-order component for route protection
export const withPermission = (
  Component: React.ComponentType,
  permission?: string,
  permissions?: string[],
  requireAll?: boolean
) => {
  return (props: any) => (
    <PermissionGuard
      permission={permission}
      permissions={permissions}
      requireAll={requireAll}
    >
      <Component {...props} />
    </PermissionGuard>
  );
};

// Specific permission guards for common use cases
export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PermissionGuard permissions={['users.view', 'roles.view']} requireAll={false}>
    {children}
  </PermissionGuard>
);

export const SuperAdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PermissionGuard permissions={['roles.create', 'roles.edit', 'roles.delete']} requireAll={true}>
    {children}
  </PermissionGuard>
);

export const ManagerGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PermissionGuard permissions={['orders.assign', 'drivers.manage_status']} requireAll={false}>
    {children}
  </PermissionGuard>
);
