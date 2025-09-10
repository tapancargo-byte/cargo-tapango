import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  Package, 
  DollarSign, 
  Car, 
  Users, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { useDashboardStats, useOrders } from '../hooks/useSupabaseData';
import { useTheme } from '../providers/ThemeProvider';
import { InteractiveChart } from '../components/charts/InteractiveChart';
import { ResponsiveContainer, ResponsiveGrid } from '../components/layout/ResponsiveContainer';

const Dashboard: React.FC = () => {
  const { data: metrics, isLoading: metricsLoading } = useDashboardStats();
  const { data: recentOrders, isLoading: ordersLoading } = useOrders({ limit: 8 });
  const { theme } = useTheme();

  const StatCard = ({ title, value, icon, subtitle, isLoading, gradient, iconColor, trend, trendValue, trendLabel }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    subtitle?: string;
    isLoading?: boolean;
    gradient?: string;
    iconColor?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    trendLabel?: string;
  }) => {
    const cardClasses = theme === 'dark'
      ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm shadow-2xl hover:shadow-3xl'
      : 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-gray-200/50';
    
    return (
      <Card className={`relative overflow-hidden border-0 ${cardClasses} transition-all duration-300 hover:scale-[1.02] group`}>
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${gradient || 'bg-gradient-to-br from-blue-500/10 to-purple-600/10'} opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
      
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-full" />
      
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'} uppercase tracking-wider`}>{title}</CardTitle>
        <div className={`p-2 rounded-xl ${iconColor || 'bg-gradient-to-tr from-blue-500 to-purple-600'} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
            <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>Loading...</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent' : 'text-gray-900'}`}>
              {value}
            </div>
            
            <div className="flex items-center justify-between">
              {subtitle && (
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} font-medium`}>{subtitle}</p>
              )}
              
              {trend && trendValue && (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend === 'up' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : trend === 'down' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                  {trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
                  {trend === 'neutral' && <Minus className="h-3 w-3" />}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            
            {trendLabel && (
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>{trendLabel}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    );
  };

  const getStatusColor = (status: string) => {
    const darkColors = {
      'delivered': 'bg-green-900/50 text-green-300 border border-green-700/50',
      'in_transit': 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
      'pending': 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50',
      'cancelled': 'bg-red-900/50 text-red-300 border border-red-700/50',
      'default': 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
    };

    const lightColors = {
      'delivered': 'bg-green-500/20 text-green-700 border border-green-300/50',
      'in_transit': 'bg-blue-500/20 text-blue-700 border border-blue-300/50',
      'pending': 'bg-yellow-500/20 text-yellow-700 border border-yellow-300/50',
      'cancelled': 'bg-red-500/20 text-red-700 border border-red-300/50',
      'default': 'bg-gray-500/20 text-gray-700 border border-gray-300/50'
    };

    const colors = theme === 'dark' ? darkColors : lightColors;
    return colors[status as keyof typeof colors] || colors.default;
  };

  const cardClasses = theme === 'dark'
    ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border-slate-700/50'
    : 'bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-300/60 shadow-lg';

  const headerClasses = theme === 'dark'
    ? 'bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-slate-700/50'
    : 'bg-gradient-to-r from-white/95 to-gray-100/90 backdrop-blur-sm border border-gray-300/70 shadow-md';

  const textClasses = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtitleClasses = theme === 'dark' ? 'text-slate-400' : 'text-gray-600';

  return (
    <ResponsiveContainer variant="dashboard" breakpoint="xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl" />
          <div className={`relative ${headerClasses} rounded-2xl p-8 shadow-2xl`}>
            <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl @md:text-3xl @lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent mb-2">
                  Dashboard Overview
                </h1>
                <p className={`${subtitleClasses} text-base @lg:text-lg`}>
                  Welcome back! Here's what's happening with your delivery service today.
                </p>
              </div>
              <div className="flex flex-col @md:flex-row items-start @md:items-center gap-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${theme === 'dark' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300' : 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/40 text-green-700'} shadow-sm hover:shadow-md transition-all duration-200`}>
                  <div className={`w-3 h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-green-500 shadow-lg shadow-green-500/30'}`} />
                  <span className="text-sm font-semibold">System Online</span>
                </div>
                <div className="text-left @md:text-right">
                  <p className={`text-xs ${subtitleClasses} uppercase tracking-wider`}>Last Updated</p>
                  <p className={`${textClasses} font-semibold`}>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Key Metrics Cards */}
        {metricsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto" />
              <span className={subtitleClasses}>Loading metrics...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {/* Total Orders */}
            <div className={`relative p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60'} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              {/* Trend indicator */}
              <div className="absolute top-3 right-3 flex items-center space-x-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>+12%</span>
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className={`text-2xl @lg:text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {metrics?.totalOrders ?? 0}
                </div>
                <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Total Orders
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} flex items-center space-x-1`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>{metrics ? `${metrics.completionRate.toFixed(1)}% completion rate` : '0.0% completion rate'}</span>
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className={`relative p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60'} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              {/* Trend indicator */}
              <div className="absolute top-3 right-3 flex items-center space-x-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>+8.3%</span>
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className={`text-2xl @lg:text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {metrics ? `$${metrics.totalRevenue.toLocaleString()}` : '$0'}
                </div>
                <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Revenue
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} flex items-center space-x-1`}>
                  <DollarSign className="h-3 w-3" />
                  <span>{metrics ? `$${metrics.avgOrderValue.toFixed(2)} avg order` : '$0.00 avg order'}</span>
                </div>
              </div>
            </div>

            {/* Active Drivers */}
            <div className={`relative p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60'} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              {/* Trend indicator */}
              <div className="absolute top-3 right-3 flex items-center space-x-1">
                <Minus className="h-3 w-3 text-gray-500" />
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>0%</span>
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className={`text-2xl @lg:text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {metrics ? `${metrics.onlineDrivers}/${metrics.totalDrivers}` : '0/0'}
                </div>
                <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Active Drivers
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} flex items-center space-x-1`}>
                  <Car className="h-3 w-3" />
                  <span>Currently online</span>
                </div>
              </div>
            </div>

            {/* Customers */}
            <div className={`relative p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50' : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60'} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              {/* Trend indicator */}
              <div className="absolute top-3 right-3 flex items-center space-x-1">
                <ArrowUpRight className="h-3 w-3 text-green-500" />
                <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>+5.2%</span>
              </div>
              
              {/* Content */}
              <div className="relative">
                <div className={`text-2xl @lg:text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {metrics?.totalCustomers ?? 1}
                </div>
                <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Customers
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} flex items-center space-x-1`}>
                  <Users className="h-3 w-3" />
                  <span>Total registered</span>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <InteractiveChart
            title="Revenue Trend"
            type="area"
            dataKey="revenue"
            timeRange="30d"
          />
        </div>
        <div className="col-span-3">
          <InteractiveChart
            title="Order Status"
            type="pie"
            dataKey="orders"
          />
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <InteractiveChart
          title="Daily Orders"
          type="bar"
          dataKey="orders"
          timeRange="30d"
        />
        <InteractiveChart
          title="Customer Growth"
          type="area"
          dataKey="customers"
          timeRange="90d"
        />
      </div>

      {/* Recent Orders */}
      <Card className={`${cardClasses} shadow-2xl`}>
        <CardHeader className={`border-b ${theme === 'dark' ? 'border-slate-700/30' : 'border-gray-200'} pb-4`}>
          <CardTitle className={`flex items-center gap-3 ${textClasses}`}>
            <div className="p-2 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Recent Orders</span>
          </CardTitle>
          <CardDescription className={subtitleClasses}>
            Latest orders from your delivery service
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {ordersLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto" />
                <span className={subtitleClasses}>Loading orders...</span>
              </div>
            </div>
          ) : recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div
                  key={order.id}
                  className={`group relative flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-slate-700/50 hover:from-slate-800/50 hover:to-slate-700/30 hover:border-slate-600/50' : 'bg-gradient-to-r from-gray-50/80 to-gray-100/80 border border-gray-200/50 hover:from-gray-100/90 hover:to-gray-200/90 hover:border-gray-300/50'} rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
                >
                  {/* Order indicator line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center space-x-4 ml-2">
                    {/* Status indicator */}
                    <div className={`w-3 h-3 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-400 shadow-lg shadow-green-400/50' :
                      order.status === 'in_transit' ? 'bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse' :
                      order.status === 'pending' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' :
                      'bg-red-400 shadow-lg shadow-red-400/50'
                    }`} />
                    
                    <div>
                      <p className={`font-semibold ${textClasses} text-sm`}>#{order.tracking_code}</p>
                      <p className={`text-xs ${subtitleClasses}`}>
                        {(order as any).customer?.name || 'Customer'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${getStatusColor(order.status || 'pending')}`}>
                      {(order.status || 'pending').replace('_', ' ')}
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} font-medium mt-1`}>
                      ${(order as any).total_price || (order as any).price || 0}
                    </p>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5' : 'bg-gradient-to-r from-blue-500/3 to-purple-500/3'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-gradient-to-tr from-slate-700/50 to-slate-600/30' : 'bg-gradient-to-tr from-gray-200/80 to-gray-300/80'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Package className={`h-8 w-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`} />
              </div>
              <p className={`${subtitleClasses} font-medium`}>No recent orders found</p>
              <p className={`${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} text-sm mt-1`}>Orders will appear here once customers start booking</p>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </ResponsiveContainer>
  );
};

export default Dashboard;