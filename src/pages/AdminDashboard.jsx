import AppSidebar from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Analytics from "./admin/Analytics";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import Sellers from "./admin/Sellers";
import AddProduct from "@/components/shop/AddProduct";

const Delivery = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Delivery</h1>
      <p className="mt-2 text-muted-foreground">Manage deliveries here.</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [active, setActive] = useState("analytics");

  const renderPage = () => {
    switch (active) {
      case "analytics":
        return <Analytics />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      case "sellers":
        return <Sellers />;
      case "add-product":
        return <AddProduct />;
      case "delivery":
        return <Delivery />;

      default:
        return <Analytics />;
    }
  };

  return (
    <>
      <SidebarProvider className="h-svh min-h-0 overflow-hidden">
        <AppSidebar active={active} setActive={setActive} />

        <SidebarInset className="min-h-0 overflow-auto">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />

            <div className="h-4 w-px bg-border" />

            <span className="text-sm font-medium text-muted-foreground">
              Admin Dashboard
            </span>
          </header>

          {/* Current Page */}
          {renderPage()}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;
