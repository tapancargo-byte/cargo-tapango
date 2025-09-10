import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../providers/ThemeProvider';
import { useNotifications } from '../../hooks/useSupabaseData';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { data: notifications } = useNotifications({ limit: 100 });

  // Count unread notifications
  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <header className={`flex h-16 items-center justify-end border-b px-6 shadow-lg ${
      theme === 'dark' 
        ? 'border-slate-700/50 bg-slate-900/80 backdrop-blur-sm' 
        : 'border-gray-200 bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className={theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className={`relative ${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-600"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
        
        {/* Profile */}
        <Button variant="ghost" size="icon" className={theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}>
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
