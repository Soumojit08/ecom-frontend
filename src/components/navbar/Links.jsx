import { Link } from "react-router-dom";
import Logo from "../../../public/logo.svg";

const Links = () => {
  return (
    <div className="flex items-center gap-18">
      <Link to="/" className="flex shrink-0 items-center">
        <img src={Logo} alt="Logo" className="h-7 w-auto" />
      </Link>

      <ul className="hidden items-center gap-8 text-[15px] font-medium text-foreground/80 lg:flex">
        <li>
          <Link
            to="/"
            className="transition-colors hover:text-accent-foreground"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className="transition-colors hover:text-accent-foreground"
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="transition-colors hover:text-accent-foreground"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="transition-colors hover:text-accent-foreground"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Links;
