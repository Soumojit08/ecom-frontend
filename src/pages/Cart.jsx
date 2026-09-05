import CartProduct from "@/components/cart/CartProduct";
import CartSummary from "@/components/cart/CartSummary";
import products from "@/data";
import { useState } from "react";

const sampleItems = products
  .filter((product) => product.image && !product.image.startsWith("/images/"))
  .slice(0, 2)
  .map((product, index) => ({
    ...product,
    quantity: index === 0 ? 1 : 2,
  }));

const Cart = () => {
  const [items, setItems] = useState(sampleItems);

  const updateQuantity = (productId, quantity) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeItem = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-muted/30 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            Your selection
          </p>
          <h1 className="font-sora text-3xl font-semibold tracking-tight sm:text-4xl">
            Shopping cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review your items before checking out.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <CartProduct
            items={items}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
          <CartSummary items={items} />
        </div>
      </div>
    </main>
  );
};

export default Cart;
