import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import categories from "@/data/categories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const products = categories.map((product) => product);

  return (
    <section className="px-12 mt-10">
      <div id="heading" className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-barlow font-medium">Shop By Category</h1>
        <Button
          variant="default"
          size="lg"
          className="transition-all duration-150 font-barlow tracking-wide"
        >
          <Link to="/shop">Show Categories</Link>
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-5xl w-full mx-auto">
        {products.map((product) => (
          <CategoryCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
