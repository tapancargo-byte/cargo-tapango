import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bell, Check, Clock, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  user_id: string;
  type: 'order_update' | 'driver_assigned' | 'payment' | 'invoice' | 'system' | 'marketing';
  title: string;
  message: string;
  is_read: boolean | null;
  created_at: string | null;
  user_profile?: {
    name: string;
    email: string;
  };
}

function Notifications() {
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<Notification[]> => {
      const { data, error } = await supabase
        .from('notifications')
        .select(`
          *,
          user_profile:profiles!notifications_user_id_fkey(name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch notifications: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order_update':
        return <Clock className="h-4 w-4" />;
      case 'driver_assigned':
        return <Check className="h-4 w-4" />;
      case 'payment':
      case 'invoice':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order_update':
        return 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50';
      case 'driver_assigned':
        return 'bg-green-500/20 text-green-700 border border-green-300/50 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50';
      case 'payment':
        return 'bg-yellow-500/20 text-yellow-700 border border-yellow-300/50 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50';
      case 'invoice':
        return 'bg-purple-500/20 text-purple-700 border border-purple-300/50 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50';
      case 'system':
        return 'bg-gray-500/20 text-gray-700 border border-gray-300/50 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
      default:
        return 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage system notifications and alerts
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage system notifications and alerts
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Error loading notifications: {(error as Error).message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const unreadCount = notifications?.filter(n => n.is_read === false || n.is_read === null).length || 0;
  const totalCount = notifications?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          {unreadCount} unread of {totalCount} total notifications
        </p>
      </div>

      <div className="grid gap-4">
        {notifications?.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          notifications?.map((notification) => (
            <Card 
              key={notification.id} 
              className={`${(notification.is_read === false || notification.is_read === null) ? 'border-l-4 border-l-primary bg-muted/30' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={getNotificationColor(notification.type)}
                    >
                      {notification.type.replace('_', ' ')}
                    </Badge>
                    {(notification.is_read === false || notification.is_read === null) && (
                      <Badge variant="default" className="bg-primary">
                        New
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {notification.created_at ? (
                      <>
                        {new Date(notification.created_at).toLocaleDateString()} {new Date(notification.created_at).toLocaleTimeString()}
                      </>
                    ) : 'Unknown date'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{notification.message}</p>
                {notification.user_profile && (
                  <div className="text-sm text-muted-foreground">
                    User: {notification.user_profile.name} ({notification.user_profile.email})
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
