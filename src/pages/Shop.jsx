import BreadcrumbUse from "@/components/shop/Breadcrumb";
import Products from "@/components/shop/Products";
import Sidebar from "@/components/shop/Sidebar";

const Shop = () => {
  return (
    <div className="p-4 flex items-center gap-4">
      <div className="w-1/6 inline-block space-y-4">
        <BreadcrumbUse />
        <Sidebar />
      </div>
      <Products />
    </div>
  );
};

export default Shop;
