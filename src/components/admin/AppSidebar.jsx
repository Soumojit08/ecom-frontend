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
} from "@/components/ui/sidebar";
import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  Plus,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/react";

const navigationGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, isActive: true },
      { name: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Manage",
    items: [
      { name: "Products", icon: Package },
      { name: "Add product", icon: Plus },
      { name: "Orders", icon: ClipboardList },
      { name: "Delivery", icon: Truck },
    ],
  },
  {
    label: "Accounts",
    items: [
      { name: "Users", icon: Users },
      { name: "Sellers", icon: Store },
    ],
  },
];

const AppSidebar = () => {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />

      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(({ name, icon: Icon, isActive }) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton isActive={isActive} tooltip={name}>
                      <Icon />
                      <span>{name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <UserButton />
              <span>{user.fullName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
