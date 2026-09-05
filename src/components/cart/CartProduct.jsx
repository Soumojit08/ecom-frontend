import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const CartProduct = ({ items, onQuantityChange, onRemove }) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="font-sora text-xl">My bag</CardTitle>
        <CardDescription>
          {items.length} {items.length === 1 ? "item" : "items"} selected
        </CardDescription>
      </CardHeader>

      <CardContent className="divide-y p-0">
        {items.length === 0 ? (
          <div className="px-6 py-16 text-center text-muted-foreground">
            Your bag is empty.
          </div>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="grid gap-5 px-4 py-5 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:px-6"
            >
              <div className="flex h-28 items-center justify-center rounded-lg bg-muted/60 p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.brand}
                </p>
                <h2 className="truncate font-sora text-base font-semibold">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.category}
                </p>
                <div className="mt-4 flex items-center justify-between gap-4 sm:justify-start">
                  <div className="flex items-center rounded-full border border-border p-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        onQuantityChange(
                          item.id,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        onQuantityChange(
                          item.id,
                          Math.min(10, item.quantity + 1),
                        )
                      }
                      disabled={item.quantity >= 10}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>

              <p className="font-sora text-lg font-semibold sm:self-start">
                ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
              </p>
            </article>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CartProduct;
