import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/useOrders";

/* ---------- helpers ---------- */

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(date);

const formatMonth = (date) =>
  new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(
    date,
  );

// Adjust keys to match your backend status enum (matched case-insensitively).
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  processing: {
    label: "Processing",
    badge: "border-primary/30 bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  shipped: {
    label: "Shipped",
    badge: "border-chart-4/30 bg-chart-4/10 text-chart-4",
    dot: "bg-chart-4",
  },
  delivered: {
    label: "Delivered",
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    badge: "border-destructive/30 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};
const STATUS_ORDER = Object.keys(STATUS_CONFIG);

const getStatusConfig = (key) =>
  STATUS_CONFIG[key] ?? {
    label: key ? key.charAt(0).toUpperCase() + key.slice(1) : "Unknown",
    badge: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  };

const SORTERS = {
  newest: (a, b) => b.timestamp - a.timestamp,
  oldest: (a, b) => a.timestamp - b.timestamp,
  "total-desc": (a, b) => b.totalValue - a.totalValue,
  "total-asc": (a, b) => a.totalValue - b.totalValue,
};

// Derive everything the UI needs once, so rendering/filtering stays cheap.
const normalizeOrder = (order) => {
  const items = order.items ?? [];
  const date = new Date(order.createdAt);
  return {
    ...order,
    items,
    date,
    timestamp: date.getTime(),
    statusKey: String(order.status ?? "").toLowerCase(),
    totalValue: Number(order.total || 0),
    itemCount: items.reduce((n, it) => n + Number(it.quantity || 0), 0),
    searchText: [order.orderId, ...items.map((it) => it.name)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
};

// [{ key, label, orders: [...] }] grouped by month, preserving sort order.
const groupByMonth = (orders) => {
  const groups = [];
  const index = new Map();
  for (const order of orders) {
    const key = `${order.date.getFullYear()}-${order.date.getMonth()}`;
    if (!index.has(key)) {
      const group = { key, label: formatMonth(order.date), orders: [] };
      index.set(key, group);
      groups.push(group);
    }
    index.get(key).orders.push(order);
  }
  return groups;
};

/* ---------- small components ---------- */

const StatusBadge = ({ statusKey }) => {
  const cfg = getStatusConfig(statusKey);
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-2.5 py-0.5 font-medium",
        cfg.badge,
      )}
    >
      <span className={cn("size-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </Badge>
  );
};

const OrderRow = ({ order }) => {
  const a = order.shippingAddress ?? {};
  const addressLines = [
    a.address,
    [a.city, a.state].filter(Boolean).join(", "),
    [a.pincode, a.country ?? "India"].filter(Boolean).join(", "),
  ].filter(Boolean);

  const firstItem = order.items[0]?.name;
  const extra = order.items.length - 1;

  return (
    <AccordionItem
      value={String(order.id)}
      className="overflow-hidden rounded-lg border bg-card shadow-sm last:border-b"
    >
      <AccordionTrigger className="items-center gap-4 px-5 py-4 hover:no-underline sm:px-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0 text-left">
            <p className="font-sora font-semibold">#{order.orderId}</p>
            <p className="mt-0.5 truncate text-sm font-normal text-muted-foreground">
              {firstItem ?? "No items"}
              {extra > 0 && ` + ${extra} more`}
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden text-sm font-normal text-muted-foreground md:inline">
              {formatDate(order.date)}
            </span>
            <StatusBadge statusKey={order.statusKey} />
            <span className="w-20 text-right font-sora font-semibold sm:w-24">
              {formatPrice(order.totalValue)}
            </span>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="border-t bg-muted/30 px-5 py-5 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_16rem]">
          <div>
            <p className="mb-3 text-sm font-medium">
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
              <span className="font-normal text-muted-foreground md:hidden">
                {" "}
                · {formatDate(order.date)}
              </span>
            </p>
            <ul className="divide-y">
              {order.items.map((item) => (
                <li
                  key={`${order.id}-${item.productId ?? item.id}`}
                  className="flex items-start justify-between gap-4 py-3 first:pt-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-medium">
                    {formatPrice(
                      Number(item.price || 0) * Number(item.quantity || 0),
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <Separator className="my-3" />
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span className="font-sora">{formatPrice(order.totalValue)}</span>
            </div>
          </div>

          <div className="text-sm md:border-l md:pl-6">
            <p className="mb-2 font-medium">Shipping to</p>
            <p>{a.name ?? "You"}</p>
            {a.phone && <p className="text-muted-foreground">{a.phone}</p>}
            <p className="mt-2 text-muted-foreground">
              {addressLines.join(", ")}
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const OrdersSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-9 w-48" />
    <Skeleton className="h-10 w-full max-w-md" />
    <div className="space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  </div>
);

const Message = ({ title, description, action }) => (
  <div className="mx-auto max-w-xl rounded-lg border bg-card p-10 text-center shadow-sm">
    <h2 className="font-sora text-xl font-semibold">{title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

/* ---------- page ---------- */

const Orders = () => {
  const { data, isLoading, isError, error, refetch } = useOrders();

  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [open, setOpen] = useState([]);

  const orders = useMemo(() => (data ?? []).map(normalizeOrder), [data]);

  // Tabs: "All" + statuses that actually exist, known ones first.
  const statusTabs = useMemo(() => {
    const counts = orders.reduce((acc, o) => {
      acc[o.statusKey] = (acc[o.statusKey] ?? 0) + 1;
      return acc;
    }, {});
    const keys = Object.keys(counts).sort((a, b) => {
      const ai = STATUS_ORDER.indexOf(a);
      const bi = STATUS_ORDER.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return [
      { key: "all", label: "All", count: orders.length },
      ...keys.map((key) => ({
        key,
        label: getStatusConfig(key).label,
        count: counts[key],
      })),
    ];
  }, [orders]);

  const visibleOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders
      .filter((o) => status === "all" || o.statusKey === status)
      .filter((o) => !q || o.searchText.includes(q))
      .sort(SORTERS[sort]);
  }, [orders, status, query, sort]);

  // Month headings only make sense when sorted by date.
  const groups = useMemo(
    () =>
      sort === "newest" || sort === "oldest"
        ? groupByMonth(visibleOrders)
        : [{ key: "all", label: null, orders: visibleOrders }],
    [visibleOrders, sort],
  );

  const filtersActive = status !== "all" || query.trim() !== "";
  const allOpen =
    visibleOrders.length > 0 && open.length >= visibleOrders.length;

  const clearFilters = () => {
    setStatus("all");
    setQuery("");
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {isLoading ? (
          <OrdersSkeleton />
        ) : isError ? (
          <Message
            title="We couldn't load your orders"
            description={
              error?.response?.data?.msg ??
              "Check your connection and try again."
            }
            action={
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        ) : orders.length === 0 ? (
          <Message
            title="No orders yet"
            description="Orders you place will show up here."
            action={
              <Button asChild>
                {/* Swap for <Link to="/"> if you use react-router */}
                <a href="/">Start shopping</a>
              </Button>
            }
          />
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="font-sora text-3xl font-semibold">Your orders</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {orders.length} {orders.length === 1 ? "order" : "orders"} in
                total
              </p>
            </div>

            <Tabs value={status} onValueChange={setStatus}>
              <TabsList className="h-auto w-full justify-start overflow-x-auto">
                {statusTabs.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="gap-2">
                    {tab.label}
                    <span className="text-xs text-muted-foreground">
                      {tab.count}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by order ID or product"
                  className="pl-9"
                />
              </div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="total-desc">Total: high to low</SelectItem>
                  <SelectItem value="total-asc">Total: low to high</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Showing {visibleOrders.length} of {orders.length}
              </p>
              {visibleOrders.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setOpen(
                      allOpen ? [] : visibleOrders.map((o) => String(o.id)),
                    )
                  }
                >
                  {allOpen ? "Collapse all" : "Expand all"}
                </Button>
              )}
            </div>

            {visibleOrders.length === 0 ? (
              <Message
                title="No matching orders"
                description="Try a different search or status."
                action={
                  filtersActive && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  )
                }
              />
            ) : (
              <Accordion
                type="multiple"
                value={open}
                onValueChange={setOpen}
                className="space-y-8"
              >
                {groups.map((group) => (
                  <section key={group.key} className="space-y-3">
                    {group.label && (
                      <h2 className="text-sm font-medium text-muted-foreground">
                        {group.label}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {group.orders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                      ))}
                    </div>
                  </section>
                ))}
              </Accordion>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
