import { CircleDollarSign, ClipboardList, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const SummaryCards = () => {
  const summaryCards = [
    {
      label: "Total revenue",
      value: "₹0",
      change: "This month",
      icon: CircleDollarSign,
    },
    {
      label: "Total orders",
      value: "0",
      change: "This month",
      icon: ClipboardList,
    },
    {
      label: "Products",
      value: "0",
      change: "In catalogue",
      icon: Package,
    },
    {
      label: "Customers",
      value: "0",
      change: "Registered users",
      icon: Users,
    },
  ];

  return (
    <>
      {summaryCards.map(({ label, value, change, icon: Icon }) => (
        <Card key={label} className="min-w-0">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{change}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SummaryCards;
