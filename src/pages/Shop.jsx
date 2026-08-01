import Products from "@/components/shop/Products";
import Sidebar from "@/components/shop/Sidebar";

const Shop = () => {
  return (
    <div className="p-4 flex items-center gap-4">
      <Sidebar />
      <Products />
    </div>
  );
};

export default Shop;
