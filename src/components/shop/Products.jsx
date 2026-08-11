import { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import ProductCard from "../ProductCard";
import { Spinner } from "../ui/spinner";

const Products = ({ category, search }) => {
  const [productsData, setProductsData] = useState([]);

  async function fetchProduct() {
    try {
      const response = await axiosInstance.get("/api/get-product");
      const data = response.data?.data ?? [];
      setProductsData(data);
      toast.success("Products fetched successfully");
      return data;
    } catch (error) {
      toast.error("Error in Fetching Products");
      console.log("error : ", error);
      return [];
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory = category
        ? product.category?.toLowerCase() === category
        : true;
      const matchesSearch = search
        ? [product.name, product.brand, product.category]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search))
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [productsData, category, search]);

  return (
    <div className="h-full w-full flex flex-wrap gap-8 justify-center items-start font-sora">
      {productsData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          No products match your search.
        </div>
      ) : (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="shrink-0 rounded-sm"
          />
        ))
      )}
    </div>
  );
};

export default Products;
