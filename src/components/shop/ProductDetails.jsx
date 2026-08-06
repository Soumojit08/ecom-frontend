import products from "@/data/index";
import BreadcrumbUse from "./Breadcrumb";
import { Button } from "../ui/button";
import { Heart, Share } from "lucide-react";

const ProductDetails = () => {
  const product = products.find((product) => product.id === "mb-001");

  return (
    <section className=" min-h-screen w-full space-y-4">
      <div className="w-full py-1 flex items-center px-16 bg-muted mb-8">
        <BreadcrumbUse />
      </div>
      <section className="flex gap-2 justify-center items-center">
        <div className="h-full w-1/3 flex flex-col items-center justify-center shrink-0">
          <div className="flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="w-96 h-96 object-contain drop-shadow-lg"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon-lg">
              <Heart />
            </Button>
            <Button variant="outline" size="icon-lg">
              <Share />
            </Button>
          </div>
        </div>
        <div className="h-full w-1/2 flex items-center justify-center shrink-0 border">
          product details
        </div>
      </section>
    </section>
  );
};

export default ProductDetails;
