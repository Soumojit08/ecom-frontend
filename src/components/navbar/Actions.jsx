import { Heart, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Show, SignInButton } from "@clerk/react";

const Actions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="flex shrink-0 items-center gap-5">
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

      {/* {isLoggedIn ? (
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full transition-all duration-150"
          onClick={handleLogin}
        >
          <User size={20} />
        </Button>
      ) : (
        
      )} */}
      <Show when="signed-in">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full transition-all duration-150"
          onClick={handleLogin}
        >
          <User size={20} />
        </Button>
      </Show>
      <Show when="signed-out">
        <SignInButton>
          <Button
            variant="default"
            size="lg"
            className="px-6 font-barlow tracking-wide transition-all duration-150"
            onClick={handleLogin}
          >
            Login
          </Button>
        </SignInButton>
      </Show>
    </div>
  );
};

export default Actions;
