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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

const ProductCard = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const handleBuyNow = async () => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please sign in to add items to your cart");
      return;
    }

    setIsAdding(true);
    try {
      const token = await getToken();
      await axiosInstance.post(
        "/api/cart/items",
        { productId: Number(props.product.id), quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Added to cart");
      navigate("/cart");
    } catch (error) {
      toast.error(error.response?.data?.msg ?? "Could not add item to cart");
    } finally {
      setIsAdding(false);
    }
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
          <Button size="lg" onClick={handleBuyNow} disabled={isAdding}>
            {isAdding ? "Adding..." : "Buy now"}
          </Button>
          <Link to={`/shop/${props.product.category}/${props.product.id}`}>
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
