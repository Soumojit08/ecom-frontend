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
      {
        name: "Analytics",
        icon: BarChart3,
        page: "analytics",
      },
    ],
  },

  {
    label: "Manage",
    items: [
      {
        name: "Products",
        icon: Package,
        page: "products",
      },

      {
        name: "Add product",
        icon: Plus,
        page: "add-product",
      },

      {
        name: "Orders",
        icon: ClipboardList,
        page: "orders",
      },

      {
        name: "Delivery",
        icon: Truck,
        page: "delivery",
      },
    ],
  },

  {
    label: "Accounts",
    items: [
      {
        name: "Users",
        icon: Users,
        page: "users",
      },

      {
        name: "Sellers",
        icon: Store,
        page: "sellers",
      },
    ],
  },
];

const AppSidebar = ({ active, setActive }) => {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />

      <SidebarContent>
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden  font-sora tracking-wider">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(({ name, icon: Icon, page }) => (
                  <SidebarMenuItem key={name}>
                    <SidebarMenuButton
                      isActive={active === page}
                      tooltip={name}
                      onClick={() => setActive(page)}
                    >
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
