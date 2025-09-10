import React, { useState } from 'react';
import { Shield, Users, Settings, Database, Activity, AlertTriangle, ToggleLeft, ToggleRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useToast } from '../components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useRoles, useAssignRole, useRemoveRole } from '../hooks/useRoles';
import { useCustomers } from '../hooks/useCustomers';

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'core' | 'experimental' | 'premium';
}

interface SystemStat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  status: 'healthy' | 'warning' | 'error';
}

const SuperAdmin: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showUserRoleModal, setShowUserRoleModal] = useState(false);

  const { toast } = useToast();
  const { data: roles } = useRoles();
  const { data: users } = useCustomers(); // Using customers as users for demo
  const assignRoleMutation = useAssignRole();
  const removeRoleMutation = useRemoveRole();

  // Mock feature flags - in real app, these would come from database
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([
    {
      id: 'real_time_tracking',
      name: 'Real-time Tracking',
      description: 'Enable real-time GPS tracking for all orders',
      enabled: true,
      category: 'core',
    },
    {
      id: 'ai_route_optimization',
      name: 'AI Route Optimization',
      description: 'Use AI to optimize delivery routes',
      enabled: false,
      category: 'experimental',
    },
    {
      id: 'premium_analytics',
      name: 'Premium Analytics',
      description: 'Advanced analytics and reporting features',
      enabled: true,
      category: 'premium',
    },
    {
      id: 'multi_language',
      name: 'Multi-language Support',
      description: 'Support for multiple languages in the app',
      enabled: false,
      category: 'core',
    },
    {
      id: 'advanced_notifications',
      name: 'Advanced Notifications',
      description: 'Rich push notifications with actions',
      enabled: true,
      category: 'premium',
    },
    {
      id: 'beta_features',
      name: 'Beta Features',
      description: 'Enable access to beta features for testing',
      enabled: false,
      category: 'experimental',
    },
  ]);

  // Mock system statistics
  const systemStats: SystemStat[] = [
    {
      label: 'Total Users',
      value: users?.length || 0,
      icon: <Users className="h-4 w-4" />,
      status: 'healthy',
    },
    {
      label: 'Active Sessions',
      value: 127,
      icon: <Activity className="h-4 w-4" />,
      status: 'healthy',
    },
    {
      label: 'Database Size',
      value: '2.4 GB',
      icon: <Database className="h-4 w-4" />,
      status: 'warning',
    },
    {
      label: 'System Load',
      value: '45%',
      icon: <Activity className="h-4 w-4" />,
      status: 'healthy',
    },
  ];

  const handleToggleFeatureFlag = (flagId: string) => {
    setFeatureFlags(prev =>
      prev.map(flag =>
        flag.id === flagId ? { ...flag, enabled: !flag.enabled } : flag
      )
    );
    
    const flag = featureFlags.find(f => f.id === flagId);
    toast({
      title: 'Feature flag updated',
      description: `${flag?.name} has been ${flag?.enabled ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      await assignRoleMutation.mutateAsync({
        userId: selectedUser,
        roleId: selectedRole,
      });
      setShowUserRoleModal(false);
      setSelectedUser('');
      setSelectedRole('');
      toast({
        title: 'Role assigned',
        description: 'The role has been assigned to the user successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to assign role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: SystemStat['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryColor = (category: FeatureFlag['category']) => {
    switch (category) {
      case 'core': return 'default';
      case 'experimental': return 'secondary';
      case 'premium': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-600" />
            Super Admin
          </h1>
          <p className="text-muted-foreground">Advanced system administration and configuration</p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Warning:</strong> You are in Super Admin mode. Changes made here can affect the entire system. Please proceed with caution.
        </AlertDescription>
      </Alert>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className={getStatusColor(stat.status)}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Badge variant={stat.status === 'healthy' ? 'default' : stat.status === 'warning' ? 'secondary' : 'destructive'}>
                {stat.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Feature Flags
            </CardTitle>
            <CardDescription>
              Control system features and experimental functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureFlags.map((flag) => (
              <div key={flag.id} className="flex items-center justify-between space-x-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={flag.id} className="font-medium">
                      {flag.name}
                    </Label>
                    <Badge variant={getCategoryColor(flag.category)}>
                      {flag.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {flag.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {flag.enabled ? (
                    <ToggleRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                  <Switch
                    id={flag.id}
                    checked={flag.enabled}
                    onCheckedChange={() => handleToggleFeatureFlag(flag.id)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Role Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Role Management
            </CardTitle>
            <CardDescription>
              Assign and manage user roles and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={showUserRoleModal} onOpenChange={setShowUserRoleModal}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  Assign Role to User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Role</DialogTitle>
                  <DialogDescription>
                    Select a user and role to assign
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>User</Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name || user.email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles?.map((role) => (
                          <SelectItem key={role.id} value={role.id!}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowUserRoleModal(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAssignRole}
                      disabled={!selectedUser || !selectedRole || assignRoleMutation.isPending}
                    >
                      {assignRoleMutation.isPending ? 'Assigning...' : 'Assign Role'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Quick Actions</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  View Audit Log
                </Button>
                <Button variant="outline" size="sm">
                  Export Users
                </Button>
                <Button variant="outline" size="sm">
                  System Backup
                </Button>
                <Button variant="outline" size="sm">
                  Clear Cache
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Configuration
          </CardTitle>
          <CardDescription>
            Advanced system settings and maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  defaultValue="1000"
                  placeholder="Enter maximum users"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  defaultValue="60"
                  placeholder="Enter session timeout"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiRateLimit">API Rate Limit (requests/minute)</Label>
                <Input
                  id="apiRateLimit"
                  type="number"
                  defaultValue="1000"
                  placeholder="Enter rate limit"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logLevel">Log Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button>
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Admin Activity
          </CardTitle>
          <CardDescription>
            Latest administrative actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-01-15 14:30:22</TableCell>
                <TableCell>Role Assignment</TableCell>
                <TableCell>admin@tapango.com</TableCell>
                <TableCell>Assigned Manager role to john.doe@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-15 14:25:15</TableCell>
                <TableCell>Feature Flag</TableCell>
                <TableCell>admin@tapango.com</TableCell>
                <TableCell>Enabled AI Route Optimization</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-15 14:20:08</TableCell>
                <TableCell>System Config</TableCell>
                <TableCell>admin@tapango.com</TableCell>
                <TableCell>Updated session timeout to 60 minutes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-15 14:15:33</TableCell>
                <TableCell>User Creation</TableCell>
                <TableCell>admin@tapango.com</TableCell>
                <TableCell>Created new user: jane.smith@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdmin;
