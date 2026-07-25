import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import motherboard from "../assets/motherboard.png";
import playstation from "../assets/PlayStation 5 Digital-Photoroom.png";
import mouse from "../assets/mouse.png";

const Features = () => {
  const Products = [
    {
      name: "ASUS Motherboard",
      category: "Motherboard",
      price: 10000,
      brand: "ASUS",
      description: "4 RAM slot motherboard",
      image: motherboard,
    },
    {
      name: "ASUS Mouse",
      category: "Mouse",
      price: 3000,
      brand: "ASUS",
      description: "RBG mouse",
      image: mouse,
    },
    {
      name: "Play Station 5",
      category: "playstation",
      price: 50000,
      brand: "SONY",
      description: "White color PS5",
      image: playstation,
    },
  ];

  return (
    <section className="px-12">
      <div id="heading" className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-barlow font-medium">Featured Products</h1>
        <Button
          variant="default"
          size="lg"
          className="transition-all duration-150 font-barlow tracking-wide"
        >
          View More
          <span>
            <ArrowRight />
          </span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        <ProductCard product={Products[0]} />
        <ProductCard product={Products[1]} />
        <ProductCard product={Products[2]} />
      </div>
    </section>
  );
};

export default Features;
