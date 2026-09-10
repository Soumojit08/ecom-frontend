import { useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { useAuth } from "@clerk/react";
import axiosInstance from "@/lib/axios";
import useCart from "@/hooks/useCart";
import { useQuery } from "@tanstack/react-query";

const Actions = () => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const itemCount = useCart((state) => state.itemCount);
  const setCart = useCart((state) => state.setCart);
  const clearCart = useCart((state) => state.clearCart);

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = await getToken();
      const response = await axiosInstance.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.data ?? null;
    },
    enabled: isLoaded && isSignedIn,
  });

  useEffect(() => {
    if (cart !== undefined) setCart(cart);
  }, [cart, setCart]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) clearCart();
  }, [clearCart, isLoaded, isSignedIn]);

  return (
    <div className="flex shrink-0 items-center gap-6">
      <Link
        to="/wishlist"
        className="flex items-center text-foreground/70 transition-colors hover:text-foreground"
      >
        <Heart size={22} />
      </Link>
      <Link
        to="/cart"
        aria-label={`Shopping cart${itemCount ? `, ${itemCount} items` : ""}`}
        className="relative flex items-center text-foreground/70 transition-colors hover:text-foreground"
      >
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <Badge className="absolute -right-3.5 -top-3.5 text-[9px] flex rounded-full items-center justify-center ">
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Link>

      <Show when="signed-in">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full",
            },
          }}
        />
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl="/">
          <Button
            variant="default"
            size="lg"
            className="px-6 font-barlow tracking-wide transition-all duration-150"
          >
            Sign In
          </Button>
        </SignInButton>
      </Show>
    </div>
  );
};

export default Actions;
