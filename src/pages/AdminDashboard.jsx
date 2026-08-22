import AppSidebar from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Boxes,
  CircleDollarSign,
  ClipboardList,
  Package,
  Users,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total revenue",
    value: "₹0",
    change: "No sales yet",
    icon: CircleDollarSign,
  },
  {
    label: "Total orders",
    value: "0",
    change: "No orders yet",
    icon: ClipboardList,
  },
  {
    label: "Products",
    value: "0",
    change: "Add your first product",
    icon: Package,
  },
  {
    label: "Customers",
    value: "0",
    change: "No customers yet",
    icon: Users,
  },
];

const AdminDashboard = ({ children }) => {
  return (
    <>
      <SidebarProvider className="h-svh min-h-0 overflow-hidden">
        <AppSidebar />

        <SidebarInset className="min-h-0 overflow-auto">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Admin Dashboard
            </span>
          </header>
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div>
              <h1 className="font-sora text-2xl font-semibold tracking-tight">
                Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep track of your store at a glance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map(({ label, value, change, icon: Icon }) => (
                <Card key={label} className="min-w-0">
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {label}
                    </CardTitle>
                    <Icon className="size-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold tracking-tight">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Boxes className="size-4 text-primary" />
                  Inventory status
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Your inventory summary will appear here once products are
                  added.
                </p>
                <Badge variant="outline">Empty</Badge>
              </CardContent>
            </Card>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;
