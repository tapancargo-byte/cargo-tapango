import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Package,
  User,
  X,
  BarChart3
} from 'lucide-react'
import { useTheme } from '../../providers/ThemeProvider'

interface OrderDetailsProps {
  order: {
    id: string
    tracking_code: string
    customer_name: string
    customer_phone?: string
    customer_email?: string
    pickup_address: string
    delivery_address: string
    status: string
    total_price: number
    created_at: string
    estimated_delivery?: string
  }
  onEdit?: () => void
  onDelete?: () => void
  onContact?: () => void
}

export const OrderDetailsDrawer: React.FC<OrderDetailsProps> = ({
  order,
  onEdit,
  onDelete,
  onContact
}) => {
  const { theme } = useTheme()

  const getStatusColor = (status: string) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      in_transit: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge className={`${getStatusColor(order.status)} capitalize`}>
                {order.status.replace('_', ' ')}
              </Badge>
            </DrawerTitle>
            <DrawerDescription>
              Order #{order.tracking_code}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0 space-y-4">
            {/* Customer Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{order.customer_name}</span>
                </div>
                {order.customer_phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Phone className="h-3 w-3 mr-1" />
                      {order.customer_phone}
                    </Button>
                  </div>
                )}
                {order.customer_email && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <Mail className="h-3 w-3 mr-1" />
                      {order.customer_email}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Addresses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Pickup</span>
                  <p className="text-sm mt-1">{order.pickup_address}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Delivery</span>
                  <p className="text-sm mt-1">{order.delivery_address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Price</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    ${order.total_price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                {order.estimated_delivery && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. Delivery</span>
                    <span className="text-sm">{new Date(order.estimated_delivery).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DrawerFooter className="grid grid-cols-2 gap-2">
            {onEdit && (
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {onContact && (
              <Button onClick={onContact}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" className="col-span-2" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Order
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline" className="col-span-2">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Quick Actions Drawer for Dashboard
interface QuickActionsDrawerProps {
  onCreateOrder?: () => void
  onViewAnalytics?: () => void
  onManageDrivers?: () => void
  onContactSupport?: () => void
}

export const QuickActionsDrawer: React.FC<QuickActionsDrawerProps> = ({
  onCreateOrder,
  onViewAnalytics,
  onManageDrivers,
  onContactSupport
}) => {
  const { theme } = useTheme()

  const quickActions = [
    {
      title: 'Create Order',
      description: 'Add a new delivery order',
      icon: <Package className="h-5 w-5" />,
      color: 'bg-blue-500',
      action: onCreateOrder
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'bg-green-500',
      action: onViewAnalytics
    },
    {
      title: 'Manage Drivers',
      description: 'Driver assignments and status',
      icon: <User className="h-5 w-5" />,
      color: 'bg-purple-500',
      action: onManageDrivers
    },
    {
      title: 'Contact Support',
      description: 'Get help with any issues',
      icon: <MessageCircle className="h-5 w-5" />,
      color: 'bg-orange-500',
      action: onContactSupport
    }
  ]

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" className="fixed bottom-4 right-4 md:hidden shadow-lg">
          Quick Actions
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Quick Actions</DrawerTitle>
            <DrawerDescription>
              Frequently used actions for easy access
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-0">
            <div className="grid gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto p-4 justify-start"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
