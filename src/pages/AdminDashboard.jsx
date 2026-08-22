import AppSidebar from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const AdminDashboard = ({ children }) => {
  return (
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
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboard;
