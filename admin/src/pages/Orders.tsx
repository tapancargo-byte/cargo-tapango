import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useOrders, useAssignDriver, OrderFilters } from '../hooks/useOrders';
import { useDrivers } from '../hooks/useDrivers';
import { OrderWithRelations } from '../lib/supabase';
import { toCSV } from '../lib/csv';

const Orders: React.FC = () => {
  const [filters, setFilters] = useState<OrderFilters>({ 
    limit: 20, 
    offset: 0,
    status: undefined,
    q: ''
  });
  const [selectedOrder, setSelectedOrder] = useState<OrderWithRelations | null>(null);

  const { data: orders, isLoading } = useOrders(filters);
  const { data: drivers } = useDrivers({ status: 'online' });
  const assignDriverMutation = useAssignDriver();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-700 border border-green-300/50 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50';
      case 'in_transit': return 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50';
      case 'picked_up': return 'bg-purple-500/20 text-purple-700 border border-purple-300/50 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50';
      case 'driver_assigned': return 'bg-orange-500/20 text-orange-700 border border-orange-300/50 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50';
      case 'confirmed': return 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50';
      case 'pending': return 'bg-yellow-500/20 text-yellow-700 border border-yellow-300/50 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50';
      case 'cancelled': return 'bg-red-500/20 text-red-700 border border-red-300/50 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50';
      default: return 'bg-gray-500/20 text-gray-700 border border-gray-300/50 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
    }
  };

  const onAssignDriver = async (orderId: string, driverId: string) => {
    try {
      await assignDriverMutation.mutateAsync({ orderId, driverId });
    } catch (error) {
      console.error('Failed to assign driver:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">Manage delivery orders and track their status</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" data-testid="orders-filters">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Search orders..." className="max-w-sm" value={filters.q || ''} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From</label>
              <Input type="date" value={filters.fromDate || ''} onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To</label>
              <Input type="date" value={filters.toDate || ''} onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
            </div>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? undefined : value as any })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="driver_assigned">Driver Assigned</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Offset: {filters.offset} • Limit: {filters.limit}</div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilters(f => ({ ...f, offset: Math.max(0, (f.offset || 0) - (f.limit || 20)) }))}>Prev</Button>
          <Button onClick={() => setFilters(f => ({ ...f, offset: (f.offset || 0) + (f.limit || 20) }))}>Next</Button>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({orders?.length || 0})</CardTitle>
          <div className="ml-auto">
            <Button data-testid="orders-export" variant="outline" onClick={() => {
              const cols = [
                { key: 'id', label: 'ID', map: (r: any) => r.id },
                { key: 'customer', label: 'Customer', map: (r: any) => r.customer?.name || '' },
                { key: 'driver', label: 'Driver', map: (r: any) => r.driver?.user_profile?.name || '' },
                { key: 'status', label: 'Status', map: (r: any) => r.status || '' },
                { key: 'route', label: 'Route', map: (r: any) => `${r.pickup_address || ''} -> ${r.delivery_address || ''}` },
                { key: 'total_price', label: 'Price', map: (r: any) => r.total_price || 0 },
                { key: 'created_at', label: 'Created', map: (r: any) => r.created_at || '' },
              ];
              const csv = toCSV(orders || [], cols);
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'orders.csv'; a.click(); URL.revokeObjectURL(url);
            }}>Export CSV</Button>
          </div>
          <CardDescription>A list of all delivery orders in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">Loading orders...</TableCell>
                </TableRow>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.slice(-8)}</TableCell>
                    <TableCell>{order.customer?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      {order.driver?.user_profile?.name || (
                        <Select onValueChange={(driverId) => onAssignDriver(order.id, driverId)}>
                          <SelectTrigger className="w-[120px] h-8">
                            <SelectValue placeholder="Assign" />
                          </SelectTrigger>
                          <SelectContent>
                            {drivers?.map((driver) => (
                              <SelectItem key={driver.id} value={driver.id}>
                                {driver.user_profile.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status || 'pending')}>
                        {(order.status || 'pending').replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[200px]">
                          {String(order.pickup_address || '')} → {String(order.delivery_address || '')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>${(order as any).total_price || 0}</TableCell>
                    <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;