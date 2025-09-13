import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Users,
  Car,
  FileText,
  Bell,
  BarChart3,
  Settings,
  Shield,
  UserCheck,
  ChevronUp,
  User2,
  Activity,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarSeparator,
} from '../ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useDashboardStats } from '../../hooks/useSupabaseData'
import { useAuth } from '../../providers/AuthProvider'
import { useTheme } from '../../providers/ThemeProvider'

// Navigation items
const navMain = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics", 
        url: "/analytics",
        icon: BarChart3,
      }
    ]
  },
  {
    title: "Management",
    items: [
      {
        title: "Orders",
        url: "/orders", 
        icon: Package,
        badge: "pendingOrders"
      },
      {
        title: "Drivers",
        url: "/drivers",
        icon: Car,
      },
      {
        title: "Customers",
        url: "/customers",
        icon: Users,
      },
      {
        title: "Invoices",
        url: "/invoices", 
        icon: FileText,
      },
      {
        title: "Tracking Events",
        url: "/tracking-events",
        icon: Activity,
      },
      {
        title: "KYC",
        url: "/kyc",
        icon: Shield,
      }
    ]
  },
  {
    title: "System",
    items: [
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
        badge: "unreadNotifications"
      },
      {
        title: "Role Management",
        url: "/roles",
        icon: Shield,
      },
      {
        title: "Super Admin",
        url: "/super-admin", 
        icon: UserCheck,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      }
    ]
  }
]

export function AppSidebar() {
  const location = useLocation()
  const { data: dashboardStats } = useDashboardStats()
  const { user, profile, signOut } = useAuth()
  const { theme } = useTheme()

  const getBadgeValue = (badgeKey: string) => {
    switch (badgeKey) {
      case 'pendingOrders':
        return dashboardStats?.pendingOrders || 0
      case 'unreadNotifications':
        // This would need to be implemented in the dashboard stats
        return 0
      default:
        return 0
    }
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Car className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TapanGo</span>
                  <span className="truncate text-xs">Admin Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.url
                  const badgeValue = item.badge ? getBadgeValue(item.badge) : 0
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && badgeValue > 0 && (
                        <SidebarMenuBadge>
                          {badgeValue > 99 ? '99+' : badgeValue}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage 
                      src={profile?.avatar_url || '/default-avatar.png'} 
                      alt={profile?.name || 'User'} 
                    />
                    <AvatarFallback className="rounded-lg">
                      {profile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile?.name || 'User'}
                    </span>
                    <span className="truncate text-xs">
                      {profile?.role || 'admin'}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User2 className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-red-600 focus:text-red-600"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
