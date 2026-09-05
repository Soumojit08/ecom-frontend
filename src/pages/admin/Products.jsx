import ProductTable from "@/components/admin/ProductTable";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";

const Products = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/get-product");
      return response.data.data ?? [];
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <p className="mt-2 text-muted-foreground">Manage your products here.</p>

      <div className="mt-6 rounded-xl border bg-card">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Spinner />
          </div>
        ) : isError ? (
          <p className="p-6 text-sm text-destructive">
            Could not load products. Please try again.
          </p>
        ) : (
          <ProductTable products={products} />
        )}
      </div>
    </div>
  );
};

export default Products;
