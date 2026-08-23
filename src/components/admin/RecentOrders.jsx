import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const RecentOrders = () => {
  const recentOrders = [
    { id: "#1023", customer: "No orders yet", amount: "₹0", status: "Pending" },
    {
      id: "#1024",
      customer: "Your next order",
      amount: "₹0",
      status: "Pending",
    },
    {
      id: "#1025",
      customer: "Your next order",
      amount: "₹0",
      status: "Pending",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent orders</CardTitle>
        <span className="flex">
          <h6>Track order history</h6>
        </span>
      </CardHeader>
      <CardContent>
        <div className="divide-y rounded-md border">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 py-3 text-sm"
            >
              <span className="font-medium">{order.id}</span>
              <span className="truncate text-muted-foreground">
                {order.customer}
              </span>
              <span className="text-right">
                <span className="block font-medium">{order.amount}</span>
                <span className="text-xs text-muted-foreground">
                  {order.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
