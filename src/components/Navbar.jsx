import { Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../public/logo.svg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="w-full border-b px-8 py-4">
      <nav className="grid grid-cols-3 items-center">
        <section id="left" className="flex items-center">
          <Link to="/" className="uppercase tracking-wider font-barlow">
            <img src={Logo} className="w-20" />
          </Link>
        </section>

        <section id="mid" className="flex justify-center">
          <ul className="flex list-none items-center gap-4">
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

        <section id="right" className="flex items-center justify-end gap-4">
          <Link to="/wishlist" className="flex items-center">
            <Heart size={24} />
          </Link>
          <Link to="/cart" className="flex items-center">
            <ShoppingCart size={24} />
          </Link>

          {isLoggedIn ? (
            <Button
              variant="outline"
              size="icon-lg"
              className="transition-all duration-150"
              onClick={handleLogin}
            >
              <User size={20} />
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
