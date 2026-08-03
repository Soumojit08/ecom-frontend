import Actions from "./navbar/Actions";
import Links from "./navbar/Links";
import Search from "./navbar/Search";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4 md:px-10 lg:px-16">
        {/* Links */}
        <Links />

        {/* Search bar */}
        <Search />

        {/* Actions */}
        <Actions />
      </nav>
    </header>
  );
};

export default Navbar;
