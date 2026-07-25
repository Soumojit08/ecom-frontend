import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import products from "@/data";
import { Link } from "react-router-dom";

const FeaturedCards = () => {
  const featuredProd = products.filter((product) => product.featured);

  return (
    <section className="px-12">
      <div id="heading" className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-barlow font-medium">Featured Products</h1>
        <Button
          variant="default"
          size="lg"
          className="transition-all duration-150 font-barlow tracking-wide"
        >
          <Link to="/shop">View More</Link>
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        {featuredProd.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCards;
