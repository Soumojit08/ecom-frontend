import products from "@/data/index";
import ProductCard from "../ProductCard";

const Products = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-around items-start">
      {products.map(
        (product, i) =>
          i < 10 && (
            <ProductCard
              key={product.id}
              product={product}
              className="shrink-0 rounded-sm"
            />
          ),
      )}
    </div>
  );
};

export default Products;
