import { ArrowRight, Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
  CardDescription,
} from "./ui/card";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { className } = props;

  const handleBuyNow = async () => {
    console.log("Todo Add to Cart item");
  };

  return (
    <>
      <Card className={`w-full max-w-xs gap-3 mb-4 ${className}`}>
        <CardHeader className="pb-0">
          <CardAction>
            <Button variant="ghost" size="icon-lg">
              {<Heart size={24} />}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex w-full flex-col gap-4 overflow-hidden">
            <img
              src={props.product.image_url}
              alt={props.product.name}
              className="h-48 w-full object-contain opacity-90"
            />
            <div className="flex items-center justify-between gap-2">
              <span>
                <h2 className="text-base font-barlow line-clamp-1 capitalize">
                  {props.product.name}
                </h2>
                <CardDescription>{props.product.description}</CardDescription>
              </span>
              <h3 className="text-base font-semibold font-sora">
                ₹{props.product.price}
              </h3>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex items-center ">
          <Button size="lg" onClick={handleBuyNow}>
            Buy now
          </Button>
          <Link to={`/${props.product.category}/${props.product.id}`}>
            <Button variant="outline" size="lg">
              View Details
              <span>
                <ArrowRight size={24} />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
