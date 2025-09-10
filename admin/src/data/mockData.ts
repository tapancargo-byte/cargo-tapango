// Mock data for admin dashboard
import ordersData from './orders.json';
import driversData from './drivers.json';
import profilesData from './profiles.json';
import paymentsData from './payments.json';

export interface Order {
  id: string;
  customer_id: string;
  driver_id?: string;
  pickup_address: {
    street: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  delivery_address: {
    street: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  cargo_description: string;
  cargo_weight: string;
  cargo_type: string;
  price: number;
  currency: string;
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  estimated_delivery: string;
  special_instructions?: string;
  payment_method: string;
  distance: string;
  estimated_duration: string;
  rating?: {
    customer_rating?: number;
    driver_rating?: number;
    customer_comment?: string;
    driver_comment?: string;
  };
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  driver_license: string;
  vehicle: {
    type: string;
    make: string;
    model: string;
    year: number;
    license_plate: string;
    capacity: string;
    color: string;
  };
  status: 'online' | 'offline' | 'busy';
  current_location: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  rating: number;
  total_reviews: number;
  joined_date: string;
  verified: boolean;
  stats: {
    total_deliveries: number;
    completed_deliveries: number;
    cancelled_deliveries: number;
    total_earnings: number;
    this_month_earnings: number;
    hours_worked: number;
    on_time_percentage: number;
  };
}

export interface Customer {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  joined_date: string;
  verified: boolean;
  stats: {
    total_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    total_spent: number;
  };
}

export interface Payment {
  id: string;
  order_id: string;
  customer_id: string;
  driver_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_date: string;
  fees: {
    platform_fee: number;
    payment_processing_fee: number;
    driver_commission: number;
  };
  driver_payout?: {
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    payout_date?: string;
  };
}

// Convert and export mock data
export const orders: Order[] = ordersData as Order[];
export const drivers: Driver[] = driversData as Driver[];
export const customers: Customer[] = profilesData.filter((p: any) => p.role === 'customer') as Customer[];
export const payments: Payment[] = paymentsData as Payment[];

// Analytics data
export const getDashboardMetrics = () => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeOrders = orders.filter(o => ['assigned', 'picked_up', 'in_transit'].includes(o.status)).length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalDrivers = drivers.length;
  const onlineDrivers = drivers.filter(d => d.status === 'online').length;
  const totalCustomers = customers.length;

  const avgOrderValue = totalOrders > 0 ? totalRevenue / completedOrders : 0;

  // Revenue trend (mock data for last 7 days)
  const revenueTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000) + 2000,
      orders: Math.floor(Math.random() * 20) + 10,
    };
  });

  // Order status distribution
  const orderStatusData = [
    { name: 'Completed', value: completedOrders, color: '#4caf50' },
    { name: 'Active', value: activeOrders, color: '#2196f3' },
    { name: 'Pending', value: pendingOrders, color: '#ff9800' },
    { name: 'Cancelled', value: cancelledOrders, color: '#f44336' },
  ];

  return {
    totalOrders,
    completedOrders,
    pendingOrders,
    activeOrders,
    cancelledOrders,
    totalRevenue,
    totalDrivers,
    onlineDrivers,
    totalCustomers,
    avgOrderValue,
    revenueTrend,
    orderStatusData,
    completionRate: totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0,
  };
};

export const getDriverMetrics = () => {
  return drivers.map(driver => ({
    ...driver,
    totalEarnings: driver.stats.total_earnings,
    completionRate: driver.stats.total_deliveries > 0 
      ? (driver.stats.completed_deliveries / driver.stats.total_deliveries) * 100 
      : 0,
    monthlyEarnings: driver.stats.this_month_earnings,
  }));
};

export const getRecentOrders = (limit: number = 10) => {
  return orders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
    .map(order => {
      const customer = customers.find(c => c.id === order.customer_id);
      const driver = drivers.find(d => d.id === order.driver_id);
      
      return {
        ...order,
        customer_name: customer?.name || 'Unknown Customer',
        driver_name: driver?.name || 'Unassigned',
      };
    });
};