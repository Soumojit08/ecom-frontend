import BreadcrumbUse from "@/components/shop/Breadcrumb";
import Products from "@/components/shop/Products";
import Sidebar from "@/components/shop/Sidebar";
import Sorting from "@/components/shop/Sorting";

const Shop = () => {
  return (
    <div className="p-4 flex justify-between gap-4">
      <div className="w-1/2 max-h-screen inline-block space-y-3">
        <BreadcrumbUse />
        <Sidebar />
      </div>
      <div className="space-y-3 ">
        <Sorting />
        <Products />
      </div>
    </div>
  );
};

export default Shop;
