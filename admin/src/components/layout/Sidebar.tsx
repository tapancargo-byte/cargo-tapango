import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../providers/AuthProvider';
import { useTheme } from '../../providers/ThemeProvider';
import { useDashboardStats } from '../../hooks/useSupabaseData';
import { 
  Package, 
  Home, 
  ShoppingCart, 
  Users, 
  Car, 
  BarChart3, 
  Settings, 
  FileText, 
  Bell, 
  Shield, 
  UserCog 
} from 'lucide-react';

const getNavigation = (pendingOrders: number) => [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Orders', href: '/orders', icon: Package, badge: pendingOrders > 0 ? pendingOrders.toString() : undefined },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Drivers', href: '/drivers', icon: Car },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Role Management', href: '/roles', icon: UserCog, adminOnly: true },
  { name: 'Super Admin', href: '/super-admin', icon: Shield, superAdminOnly: true },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { data: dashboardStats } = useDashboardStats();

  const navigation = getNavigation(dashboardStats?.pendingOrders || 0);

  const filteredNavigation = navigation.filter((item: any) => {
    // Simplified permission check for now
    if (item.adminOnly || item.superAdminOnly) {
      return user?.role === 'super_admin' || user?.role === 'admin';
    }
    return true;
  });

  const sidebarClasses = theme === 'dark' 
    ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50' 
    : 'bg-gradient-to-br from-white via-gray-100 to-gray-50 border-gray-300/80 shadow-lg';

  const headerClasses = theme === 'dark'
    ? 'border-slate-700/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20'
    : 'border-gray-200 bg-gradient-to-r from-blue-600/10 to-purple-600/10';

  const textClasses = theme === 'dark' ? 'text-slate-400' : 'text-gray-600';
  const titleClasses = theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600';

  return (
    <div className={`flex h-full w-64 flex-col ${sidebarClasses} border-r shadow-2xl`}>
      {/* Header */}
      <div className={`flex h-20 items-center justify-center border-b ${headerClasses} backdrop-blur-sm`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h1 className={`text-xl font-bold bg-gradient-to-r ${titleClasses} bg-clip-text text-transparent`}>
            TapanGo
          </h1>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <div className={`text-xs uppercase tracking-wider ${textClasses} font-semibold mb-4 px-3`}>
          Main Menu
        </div>
        {filteredNavigation.map((item: any) => {
          const isActive = location.pathname === item.href;
          
          const activeClasses = theme === 'dark'
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/10 border border-blue-500/30'
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-lg shadow-blue-500/5 border border-blue-500/20';
            
          const hoverClasses = theme === 'dark'
            ? 'hover:bg-slate-800/50 hover:shadow-md hover:scale-[1.02] hover:border-slate-600/30'
            : 'hover:bg-gray-100/50 hover:shadow-md hover:scale-[1.02] hover:border-gray-300/30';
            
          const iconActiveClasses = theme === 'dark'
            ? 'bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg'
            : 'bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg';
            
          const iconInactiveClasses = theme === 'dark'
            ? 'text-slate-400 group-hover:text-slate-300 group-hover:bg-slate-700/50'
            : 'text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-200/50';
            
          const textActiveClasses = theme === 'dark' ? 'text-white' : 'text-gray-900';
          const textInactiveClasses = theme === 'dark' ? 'text-slate-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900';
          
          const badgeActiveClasses = theme === 'dark'
            ? 'bg-white/20 text-white shadow-lg'
            : 'bg-blue-500/20 text-blue-700 shadow-lg';
            
          const badgeInactiveClasses = theme === 'dark'
            ? 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50 group-hover:text-white'
            : 'bg-gray-200/50 text-gray-600 group-hover:bg-gray-300/50 group-hover:text-gray-800';

          return (
            <Link key={item.name} to={item.href} className="block">
              <div
                className={cn(
                  'group relative flex items-center px-3 py-3 rounded-xl transition-all duration-200 ease-out border border-transparent',
                  isActive ? activeClasses : hoverClasses
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full shadow-lg shadow-blue-400/50" />
                )}
                
                {/* Icon */}
                <div className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
                  isActive ? iconActiveClasses : iconInactiveClasses
                )}>
                  <item.icon className="w-4 h-4" />
                </div>
                
                {/* Text */}
                <span className={cn(
                  'ml-3 text-sm font-medium transition-colors duration-200',
                  isActive ? textActiveClasses : textInactiveClasses
                )}>
                  {item.name}
                </span>
                
                {/* Badge */}
                {item.badge && (
                  <div className="ml-auto">
                    <div className={cn(
                      'px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200',
                      isActive ? badgeActiveClasses : badgeInactiveClasses
                    )}>
                      {item.badge}
                    </div>
                  </div>
                )}
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700/50' : 'border-gray-200'}`}>
        <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800/30 border border-slate-700/50' : 'bg-gray-100/50 border border-gray-300/50'}`}>
          <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate`}>Admin User</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} truncate`}>Super Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
