import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const CartSummary = ({ items }) => {
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
  const delivery = subtotal >= 500 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <Card className="lg:sticky lg:top-6">
      <CardHeader>
        <CardTitle className="font-sora text-xl">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Delivery</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold">Total</span>
          <span className="font-sora text-xl font-semibold">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        <Button className="w-full" size="lg" disabled={items.length === 0}>
          Proceed to checkout
          <ArrowRight />
        </Button>

        <div className="space-y-3 border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Truck className="size-4 text-primary" />
            Free delivery on orders above ₹5000
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            Secure checkout and protected payments
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
