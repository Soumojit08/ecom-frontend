import ProductCard from "../ProductCard";
import { Spinner } from "../ui/spinner";
import { useProducts } from "@/hooks/useProducts";

const Products = ({ category, search }) => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts({ category, search });

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-destructive">
        {error?.message ?? "Could not load products."}
      </div>
    );
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
