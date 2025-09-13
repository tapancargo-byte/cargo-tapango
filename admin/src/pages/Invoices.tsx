import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Download, DollarSign, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useInvoices, useInvoiceStats, useCreateInvoice, useUpdateInvoice, useMarkInvoicePaid } from '../hooks/useInvoices';
import { useCustomers } from '../hooks/useCustomers';
import { useOrders } from '../hooks/useOrders';
import { Invoice, InvoiceFormData, InvoiceFilters, invoiceStatusOptions } from '../lib/validations/invoice';
import { InvoiceWithOrder } from '../lib/supabase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceFormSchema } from '../lib/validations/invoice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { useToast } from '../components/ui/use-toast';
import { toCSV } from '../lib/csv';

const Invoices: React.FC = () => {
  const [filters, setFilters] = useState<{
    status: 'all' | 'draft' | 'issued' | 'paid' | 'overdue' | 'void';
    search: string;
    customer_id?: string;
    date_from?: string;
    date_to?: string;
  }>({
    status: 'all',
    search: '',
    customer_id: undefined,
    date_from: undefined,
    date_to: undefined,
  });
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithOrder | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { toast } = useToast();
  const { data: invoices, isLoading } = useInvoices({
    ...(filters.status !== 'all' ? { status: filters.status as 'draft' | 'issued' | 'paid' | 'overdue' | 'void' } : {}),
    customer_id: filters.customer_id,
    date_from: filters.date_from,
    date_to: filters.date_to,
    search: filters.search,
  });
  const { data: stats } = useInvoiceStats();
  const { data: customers } = useCustomers();
  const { data: orders } = useOrders();
  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice();
  const markPaidMutation = useMarkInvoicePaid();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      order_id: '',
      customer_id: '',
      invoice_number: '',
      amount: 0,
      tax_amount: 0,
      total_amount: 0,
      status: 'draft',
      due_date: '',
      issued_date: new Date().toISOString().split('T')[0],
      payment_method: 'cash',
      notes: '',
      created_by: 'admin',
      line_items: '',
      subtotal: 0,
      items: [{
        description: '',
        quantity: 1,
        unit_price: 0,
        total_price: 0,
      }],
    },
  });

  const handleCreateInvoice = async (data: InvoiceFormData) => {
    try {
      const invoiceData = {
        ...data,
        line_items: data.line_items ? JSON.parse(data.line_items) : null,
      };
      await createInvoiceMutation.mutateAsync(invoiceData);
      setShowCreateModal(false);
      form.reset();
      toast({
        title: 'Invoice created',
        description: 'The invoice has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create invoice. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateInvoice = async (data: InvoiceFormData) => {
    if (!selectedInvoice) return;
    
    try {
      await updateInvoiceMutation.mutateAsync({
        id: selectedInvoice.id!,
        updates: data,
      });
      setShowEditModal(false);
      setSelectedInvoice(null);
      form.reset();
      toast({
        title: 'Invoice updated',
        description: 'The invoice has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update invoice. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleMarkAsPaid = async (invoiceId: string) => {
    try {
      await markPaidMutation.mutateAsync(invoiceId);
      toast({
        title: 'Invoice marked as paid',
        description: 'The invoice status has been updated to paid.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark invoice as paid. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadgeVariant = (status: Invoice['status'] | null) => {
    const actualStatus = status || 'draft';
    const statusConfig = invoiceStatusOptions.find(s => s.value === actualStatus);
    switch (statusConfig?.color) {
      case 'green': return 'default';
      case 'blue': return 'secondary';
      case 'red': return 'destructive';
      default: return 'outline';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredInvoices = invoices?.filter(invoice => {
    const matchesSearch = !filters.search || 
      invoice.invoice_number.toLowerCase().includes(filters.search.toLowerCase()) ||
      invoice.customer_profile?.name?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCustomer = !filters.customer_id || invoice.customer_id === filters.customer_id;
    
    return matchesSearch && matchesCustomer;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        </div>
        <div className="text-center py-8">Loading invoices...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage customer invoices and payments</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Create a new invoice for a customer order
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateInvoice)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select order" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {orders?.map((order) => (
                              <SelectItem key={order.id} value={order.id}>
                                #{order.id.slice(0, 8)} - {String(order.pickup_address || 'N/A')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customer_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customers?.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name || customer.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoice_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="INV-001" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {invoiceStatusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tax_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="total_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="issued_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issued Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Additional notes..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createInvoiceMutation.isPending}>
                    {createInvoiceMutation.isPending ? 'Creating...' : 'Create Invoice'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.totalAmount)} total value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paid}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.paidAmount)} collected
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sent}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.pendingAmount)} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.overdue}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.overdueAmount)} overdue
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-8"
                />
              </div>
            </div>
            <Select
              value={filters.status}
              onValueChange={(value: any) => setFilters(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {invoiceStatusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.customer_id || 'all'}
              onValueChange={(value) => setFilters(prev => ({ ...prev, customer_id: value === 'all' ? undefined : value }))}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                {customers?.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name || customer.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">From</label>
              <Input type="date" value={filters.date_from || ''} onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">To</label>
              <Input type="date" value={filters.date_to || ''} onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>
                {filteredInvoices?.length || 0} invoice(s) found
              </CardDescription>
            </div>
            <div>
              <Button variant="outline" onClick={() => {
                const cols = [
                  { key: 'invoice_number', label: 'Invoice #', map: (r: any) => r.invoice_number },
                  { key: 'customer', label: 'Customer', map: (r: any) => r.customer_profile?.name || '' },
                  { key: 'status', label: 'Status', map: (r: any) => r.status || '' },
                  { key: 'total_amount', label: 'Total', map: (r: any) => r.total_amount || 0 },
                  { key: 'tax_total', label: 'Tax', map: (r: any) => r.tax_total || 0 },
                  { key: 'issued_date', label: 'Issued', map: (r: any) => r.issued_date || '' },
                  { key: 'due_date', label: 'Due', map: (r: any) => r.due_date || '' },
                ];
                const csv = toCSV(filteredInvoices || [], cols);
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'invoices.csv'; a.click(); URL.revokeObjectURL(url);
              }}>Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices?.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoice_number}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {invoice.customer_profile?.name || 'Unknown Customer'}
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(invoice.status || 'draft')}>
                      {invoiceStatusOptions.find(s => s.value === (invoice.status || 'draft'))?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {invoice.issued_date ? formatDate(invoice.issued_date) : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {invoice.due_date ? formatDate(invoice.due_date) : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowDetailModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          form.reset({
                            ...invoice,
                            created_by: invoice.created_by || 'admin',
                            line_items: JSON.stringify(invoice.items || []),
                            subtotal: invoice.subtotal || 0,
                            tax_amount: invoice.tax_total || 0,
                            amount: invoice.total_amount || 0,
                          } as any);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {invoice.status === 'issued' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsPaid(invoice.id)}
                          disabled={markPaidMutation.isPending}
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              View complete invoice information
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Invoice Number</Label>
                  <p className="text-sm font-medium">{selectedInvoice.invoice_number}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={getStatusBadgeVariant(selectedInvoice.status)}>
                    {invoiceStatusOptions.find(s => s.value === (selectedInvoice.status || 'draft'))?.label}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer</Label>
                  <p className="text-sm">Customer</p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="text-sm font-medium">{formatCurrency(selectedInvoice.total_amount)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Issued Date</Label>
                  <p className="text-sm">{formatDate(selectedInvoice.issued_date)}</p>
                </div>
                <div>
                  <Label>Due Date</Label>
                  <p className="text-sm">{formatDate(selectedInvoice.due_date)}</p>
                </div>
              </div>
              {selectedInvoice.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm">{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogDescription>
              Update invoice information
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateInvoice)} className="space-y-4">
              {/* Same form fields as create modal */}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateInvoiceMutation.isPending}>
                  {updateInvoiceMutation.isPending ? 'Updating...' : 'Update Invoice'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;
