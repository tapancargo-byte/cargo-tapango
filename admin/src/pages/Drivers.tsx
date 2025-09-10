import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, Car, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useDrivers, useUpdateDriverStatus, useUpdateDriverOnlineStatus } from '../hooks/useDrivers';
import { DriverWithProfile } from '../lib/supabase';
import { DriverFilters } from '../lib/validations';

const Drivers: React.FC = () => {
  const [filters, setFilters] = useState<DriverFilters>({ 
    limit: 20, 
    offset: 0,
    status: undefined
  });

  const { data: drivers, isLoading } = useDrivers(filters);
  const updateStatusMutation = useUpdateDriverStatus();
  const updateOnlineMutation = useUpdateDriverOnlineStatus();

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-700 border border-green-300/50 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50';
      case 'offline': return 'bg-gray-500/20 text-gray-700 border border-gray-300/50 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
      case 'busy': return 'bg-yellow-500/20 text-yellow-700 border border-yellow-300/50 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50';
      case 'break': return 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50';
      default: return 'bg-gray-500/20 text-gray-700 border border-gray-300/50 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
    }
  };

  const getOnlineColor = (isOnline: boolean) => {
    return isOnline ? 'bg-blue-500/20 text-blue-700 border border-blue-300/50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50' : 'bg-gray-500/20 text-gray-700 border border-gray-300/50 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700/50';
  };

  const onUpdateStatus = async (driverId: string, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({ 
        id: driverId, 
        status: status as any 
      });
    } catch (error) {
      console.error('Failed to update driver status:', error);
    }
  };

  const onToggleOnline = async (driverId: string, isOnline: boolean) => {
    try {
      await updateOnlineMutation.mutateAsync({ 
        id: driverId, 
        is_online: !isOnline 
      });
    } catch (error) {
      console.error('Failed to update driver online status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Drivers Management</h1>
          <p className="text-muted-foreground">Manage driver accounts and monitor their status</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search drivers..."
                className="max-w-sm"
              />
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
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.is_online?.toString() || 'all'}
              onValueChange={(value) => setFilters({ ...filters, is_online: value === 'all' ? undefined : value === 'true' ? true : value === 'false' ? false : undefined })}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Online status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Online</SelectItem>
                <SelectItem value="false">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Drivers ({drivers?.length || 0})</CardTitle>
          <CardDescription>A list of all registered drivers in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Online</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Total Trips</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">Loading drivers...</TableCell>
                </TableRow>
              ) : drivers && drivers.length > 0 ? (
                drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{driver.user_profile.name}</span>
                        <span className="text-sm text-muted-foreground">{driver.user_profile.email}</span>
                        <span className="text-sm text-muted-foreground">{driver.user_profile.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="font-medium">{driver.vehicle_type || 'N/A'}</span>
                          <span className="text-sm text-muted-foreground">
                            {driver.vehicle_model || 'N/A'} • {driver.vehicle_plate || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{driver.license_number}</TableCell>
                    <TableCell>
                      <Select
                        value={driver.status || 'offline'}
                        onValueChange={(value) => onUpdateStatus(driver.id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="offline">Offline</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="busy">Busy</SelectItem>
                          <SelectItem value="break">Break</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(driver.status)}>
                        {(driver.status || 'offline').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleOnline(driver.id, driver.is_online || false)}
                      >
                        <Badge className={getOnlineColor(driver.is_online || false)}>
                          {driver.is_online ? 'ONLINE' : 'OFFLINE'}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{driver.rating ? driver.rating.toFixed(1) : 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{driver.total_trips || 0}</TableCell>
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
                    No drivers found
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

export default Drivers;