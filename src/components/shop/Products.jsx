import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import ProductCard from "../ProductCard";
import { Spinner } from "../ui/spinner";

const Products = () => {
  const [productsData, setProductsData] = useState([]);

  async function fetchProduct() {
    try {
      const response = await axiosInstance.get("/api/get-product");
      const data = response.data?.data ?? [];
      console.log(data)
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

  return (
    <div className="h-full w-full flex flex-wrap gap-8 justify-center items-start font-sora">
      {productsData.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        productsData.map((product) => (
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
