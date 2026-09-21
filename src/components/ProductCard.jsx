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
import useWishList from "@/hooks/useWishList";
import { useAddToCart } from "@/hooks/useCartData";
import {
  useAddWishlistItem,
  useRemoveWishlistItem,
} from "@/hooks/useWishlistData";

const ProductCard = (props) => {
  const { className } = props;
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const isWishlisted = useWishList((state) =>
    state.isWishlisted(props.product.id),
  );
  const addWishlistItem = useWishList((state) => state.addWishlistItem);
  const removeWishlistItem = useWishList((state) => state.removeWishlistItem);
  const addToCartMutation = useAddToCart();
  const addWishlistMutation = useAddWishlistItem();
  const removeWishlistMutation = useRemoveWishlistItem();
  const [isAdding, setIsAdding] = useState(false);

  const handleBuyNow = async () => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please sign in to add items to your cart");
      return;
    }

    setIsAdding(true);
    addToCartMutation.mutate(
      { productId: props.product.id, quantity: 1 },
      {
        onSuccess: () => {
          navigate("/cart");
        },
        onSettled: () => setIsAdding(false),
      },
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeWishlistMutation.mutate(props.product.id, {
        onSuccess: () => removeWishlistItem(props.product.id),
      });
      return;
    }

    addWishlistMutation.mutate(props.product.id, {
      onSuccess: () => addWishlistItem(props.product),
    });
  };

  return (
    <>
      <Card className={`w-full max-w-xs gap-3 mb-4 ${className}`}>
        <CardHeader className="pb-0">
          <CardAction>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              onClick={handleWishlistToggle}
              className={
                isWishlisted ? "text-primary" : "text-muted-foreground"
              }
              aria-label={
                isWishlisted
                  ? `Remove ${props.product.name} from wishlist`
                  : `Save ${props.product.name} to wishlist`
              }
            >
              <Heart size={24} className={isWishlisted ? "fill-current" : ""} />
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
