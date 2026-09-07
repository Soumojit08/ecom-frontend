import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NullCart = () => {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <section className="w-full max-w-lg rounded-xl border bg-card px-6 py-16 text-center shadow-sm sm:px-12">
        <ShoppingBag className="mx-auto size-14 text-muted-foreground" />
        <h1 className="mt-6 font-sora text-2xl font-semibold">
          Nothing in your cart
        </h1>
        <p className="mt-3 text-muted-foreground">
          Add products to your cart and they will appear here.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/shop">Go shopping</Link>
        </Button>
      </section>
    </main>
  );
};

export default NullCart;
