import BreadcrumbUse from "@/components/shop/Breadcrumb";
import Products from "@/components/shop/Products";
import Sidebar from "@/components/shop/Sidebar";
import Sorting from "@/components/shop/Sorting";

const Shop = () => {
  return (
    <div className="flex">
      <div className="h-full p-4 w-1/6 space-y-3 border border-t-0">
        <BreadcrumbUse />
        <Sidebar />
      </div>
      <div className="space-y-3 p-4 w-10/12 ">
        <Sorting />
        <Products />
      </div>
    </div>
  );
};

export default Shop;
