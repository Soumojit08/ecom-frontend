import { Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="w-full py-4 px-8 border-b">
      <nav className="flex items-center justify-between">
        <section
          id="left"
          className="flex items-center justify-between space-x-14"
        >
          <Link to="/">Logo</Link>
          <ul className="flex items-center gap-4 list-none">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </section>

        <section id="right" className="flex items-center gap-4">
          <span className="flex items-center gap-4">
            <Link to="/wishlist">
              <Heart size={24} />
            </Link>
            <Link to="/cart">
              <ShoppingCart size={24} />
            </Link>
          </span>

          {isLoggedIn ? (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full p-4 transition-all duration-150"
              onClick={handleLogin}
            >
              <User size={28} />
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              className="transition-all duration-150"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </section>
      </nav>
    </header>
  );
};

export default Navbar;
