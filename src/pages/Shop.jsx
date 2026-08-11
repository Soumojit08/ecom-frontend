import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BreadcrumbUse from "@/components/shop/Breadcrumb";
import Products from "@/components/shop/Products";
import Sidebar from "@/components/shop/Sidebar";
import Sorting from "@/components/shop/Sorting";

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = useMemo(
    () => searchParams.get("search")?.trim().toLowerCase() ?? "",
    [searchParams],
  );

  return (
    <div className="flex">
      <div className="h-full p-4 w-1/6 space-y-3 border border-t-0">
        <BreadcrumbUse />
        <Sidebar />
      </div>
      <div className="space-y-3 p-4 w-10/12 ">
        <Sorting />
        <Products category={category?.toLowerCase()} search={search} />
      </div>
    </div>
  );
};

export default Shop;
