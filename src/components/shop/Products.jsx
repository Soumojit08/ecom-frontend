import axiosInstance from "@/lib/axios";
import ProductCard from "../ProductCard";
import { Spinner } from "../ui/spinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchProducts = async () => {
  const response = await axiosInstance.get("/api/get-product");
  console.log(response.data.data);
  return response.data.data;
};

const Products = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return toast.error(error);
  }

  return (
    <div className="h-full w-full flex flex-wrap gap-8 justify-center items-start font-sora">
      {products.length == 0 ? (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          No products match your search.
        </div>
      ) : (
        products.map((product) => (
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
