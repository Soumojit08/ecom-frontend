import AppSidebar from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import ProductCatalouge from "@/components/admin/ProductCatalouge";
import RecentOrders from "@/components/admin/RecentOrders";
import SummaryCards from "@/components/admin/SummaryCards";
import ChartData from "@/components/admin/ChartData";

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
          <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-sora text-2xl font-semibold tracking-tight">
                  Overview
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Here is what is happening with your store today.
                </p>
              </div>
              <Badge variant="outline">Last 30 days</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCards />
            </div>

            <ChartData />

            <div className="grid gap-6 lg:grid-cols-2">
              <RecentOrders />

              <ProductCatalouge />
            </div>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;
