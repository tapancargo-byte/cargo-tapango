import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, Shield, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole, usePermissions } from '../hooks/useRoles';
import { Role, Permission, systemPermissions } from '../lib/validations/rbac';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleSchema } from '../lib/validations/rbac';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { useToast } from '../components/ui/use-toast';

const RoleManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { toast } = useToast();
  const { data: roles, isLoading } = useRoles();
  const { data: permissions } = usePermissions();
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const form = useForm<Role>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [] as string[],
      is_system_role: false,
    },
  });

  const handleCreateRole = async (data: Role) => {
    try {
      await createRoleMutation.mutateAsync(data);
      setShowCreateModal(false);
      form.reset();
      toast({
        title: 'Role created',
        description: 'The role has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateRole = async (data: Role) => {
    if (!selectedRole) return;
    
    try {
      await updateRoleMutation.mutateAsync({
        id: selectedRole.id!,
        updates: data,
      });
      setShowEditModal(false);
      setSelectedRole(null);
      form.reset();
      toast({
        title: 'Role updated',
        description: 'The role has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    
    try {
      await deleteRoleMutation.mutateAsync(selectedRole.id!);
      setShowDeleteModal(false);
      setSelectedRole(null);
      toast({
        title: 'Role deleted',
        description: 'The role has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const filteredRoles = roles?.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPermissions = systemPermissions.reduce((acc: any, permission) => {
    if (!acc[permission.resource]) {
      acc[permission.resource] = [];
    }
    acc[permission.resource].push(permission);
    return acc;
  }, {} as any);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
        </div>
        <div className="text-center py-8">Loading roles...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Create a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateRole)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter role name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_system_role"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>System Role</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            System roles cannot be deleted
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter role description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permissions</FormLabel>
                      <div className="space-y-4">
                        {Object.entries(groupedPermissions).map(([resource, perms]) => (
                          <Card key={resource}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-medium capitalize">
                                {resource}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="grid grid-cols-2 gap-2">
                                {(perms as Permission[]).map((permission: Permission) => (
                                  <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={permission.id}
                                      checked={(field.value as string[] || []).includes(permission.id)}
                                      onCheckedChange={(checked: boolean) => {
                                        const currentPermissions = (field.value as string[]) || [];
                                        if (checked) {
                                          field.onChange([...currentPermissions, permission.id]);
                                        } else {
                                          field.onChange(
                                            currentPermissions.filter(p => p !== permission.id)
                                          );
                                        }
                                      }}
                                    />
                                    <Label htmlFor={permission.id} className="text-sm">
                                      {permission.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createRoleMutation.isPending}>
                    {createRoleMutation.isPending ? 'Creating...' : 'Create Role'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            {filteredRoles?.length || 0} role(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles?.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground max-w-xs truncate">
                      {role.description || 'No description'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{role.permissions?.length || 0} permissions</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={role.is_system_role ? 'default' : 'secondary'}>
                      {role.is_system_role ? 'System' : 'Custom'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRole(role);
                          form.reset({
                            ...role,
                            permissions: role.permissions || []
                          });
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!role.is_system_role && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRole(role);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Role Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update role information and permissions
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateRole)} className="space-y-4">
              {/* Same form fields as create modal */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter role name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_system_role"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>System Role</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          System roles cannot be deleted
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter role description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissions</FormLabel>
                    <div className="space-y-4">
                      {Object.entries(groupedPermissions).map(([resource, perms]) => (
                        <Card key={resource}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium capitalize">
                              {resource}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="grid grid-cols-2 gap-2">
                              {(perms as Permission[]).map((permission: Permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`edit-${permission.id}`}
                                    checked={(field.value as string[] || []).includes(permission.id)}
                                    onCheckedChange={(checked: boolean) => {
                                      const currentPermissions = (field.value as string[]) || [];
                                      if (checked) {
                                        field.onChange([...currentPermissions, permission.id]);
                                      } else {
                                        field.onChange(
                                          currentPermissions.filter(p => p !== permission.id)
                                        );
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                                    {permission.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateRoleMutation.isPending}>
                  {updateRoleMutation.isPending ? 'Updating...' : 'Update Role'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  You are about to delete the role "{selectedRole.name}". All users with this role will lose their associated permissions.
                </AlertDescription>
              </Alert>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteRole}
                  disabled={deleteRoleMutation.isPending}
                >
                  {deleteRoleMutation.isPending ? 'Deleting...' : 'Delete Role'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
