import { Badge } from "@/components/ui/badge";
import ProductCatalouge from "@/components/admin/ProductCatalouge";
import RecentOrders from "@/components/admin/RecentOrders";
import SummaryCards from "@/components/admin/SummaryCards";
import ChartData from "@/components/admin/ChartData";

const Analytics = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
      {/* Heading */}
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

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCards />
      </div>

      {/* Chart */}
      <ChartData />

      {/* Bottom section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <ProductCatalouge />
      </div>
    </div>
  );
};

export default Analytics;
