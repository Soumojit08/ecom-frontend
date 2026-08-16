import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Show, SignInButton, UserButton } from "@clerk/react";

const Actions = () => {
  return (
    <div className="flex shrink-0 items-center gap-4">
      <Link
        to="/wishlist"
        className="flex items-center text-foreground/70 transition-colors hover:text-foreground"
      >
        <Heart size={22} />
      </Link>
      <Link
        to="/cart"
        className="flex items-center text-foreground/70 transition-colors hover:text-foreground"
      >
        <ShoppingCart size={22} />
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
