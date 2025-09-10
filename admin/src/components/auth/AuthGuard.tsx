import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { LoginForm } from './LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Loader2, ShieldX } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

export function AuthGuard({ children, requireSuperAdmin = false }: AuthGuardProps) {
  const { user, profile, loading, isAdmin, isSuperAdmin } = useAuth();
  
  // Debug logging
  console.log('AuthGuard state:', { user: !!user, profile, loading, isAdmin, isSuperAdmin });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <LoginForm />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <ShieldX className="h-6 w-6 text-destructive" />
              Access Denied
            </CardTitle>
            <CardDescription className="text-center">
              You don't have permission to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Contact your system administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <ShieldX className="h-6 w-6 text-destructive" />
              Super Admin Required
            </CardTitle>
            <CardDescription className="text-center">
              This section requires super admin privileges
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
