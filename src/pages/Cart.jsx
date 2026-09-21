import { useEffect } from "react";
import CartProduct from "@/components/cart/CartProduct";
import CartSummary from "@/components/cart/CartSummary";
import NullCart from "@/components/cart/NullCart";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/react";
import useCart from "@/hooks/useCart";
import {
  useCartData,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/hooks/useCartData";

const Cart = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const setCart = useCart((state) => state.setCart);
  const clearCart = useCart((state) => state.clearCart);
  const {
    data: cart,
    isLoading,
    isError,
    error,
    refetch,
  } = useCartData({ enabled: isLoaded && isSignedIn });

  const cartUpdateMutation = useUpdateCartItem();
  const cartRemoveMutation = useRemoveCartItem();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !cart) {
      clearCart();
      return;
    }
    setCart(cart);
  }, [cart, clearCart, isLoaded, isSignedIn, setCart]);

  const cartMutation = {
    isPending: cartUpdateMutation.isPending || cartRemoveMutation.isPending,
    mutate: ({ productId, quantity, remove = false }) => {
      if (remove) {
        cartRemoveMutation.mutate(productId);
        return;
      }

      cartUpdateMutation.mutate({ productId, quantity });
    },
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-sora text-xl font-semibold">
            Could not load your cart
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {error?.response?.data?.msg ?? "Please try again."}
          </p>
          <Button className="mt-4" variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      </main>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return <NullCart />;
  }

  const items = cart.cartItems.map(({ product, quantity, productId }) => ({
    id: productId,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    image: product.image_url,
    quantity,
  }));

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
            isUpdating={cartMutation.isPending}
            onQuantityChange={(productId, quantity) =>
              cartMutation.mutate({ productId, quantity })
            }
            onRemove={(productId) =>
              cartMutation.mutate({ productId, remove: true })
            }
          />
          <CartSummary items={items} />
        </div>
      </div>
    </main>
  );
};

export default Cart;
