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
import { useState } from "react";
import toast from "react-hot-toast";

const ProductCard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [wishListed, setWishListed] = useState(false);
  const { className } = props;

  const handleWishList = () => {
    if (isLoggedIn) {
      toast.success("WishList");
      if (!wishListed) {
        setWishListed(wishListed);
      } else {
        setWishListed(!wishListed);
      }
    } else {
      toast.error("Please Login To Use WishList");
      return;
    }
  };

  return (
    <>
      <Card className={`w-full max-w-xs gap-3 mb-4 ${className}`}>
        <CardHeader className="pb-0">
          <CardAction>
            <Button onClick={handleWishList} variant="ghost" size="icon-lg">
              {<Heart size={24} />}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex w-full flex-col gap-4">
            <img
              src={props.product.image}
              alt=""
              className="h-48 w-full object-contain drop-shadow-2xl"
            />
            <div className="flex items-center justify-between gap-2">
              <span>
                <h2 className="text-base font-barlow line-clamp-1">
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
          <Button size="lg">Shop now</Button>
          <Button variant="outline" size="lg">
            View Details
            <span>
              <ArrowRight size={24} />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
