import { products } from "@/data/index";
import ProductCard from "../ProductCard";

const Products = () => {
  const productsData = products.filter(
    (product) => product.category === "playstation",
  );

  return (
    <div className="flex flex-wrap gap-4 justify-evenly items-start font-sora">
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="shrink-0 rounded-sm"
        />
      ))}
    </div>
  );
};

export default Products;
