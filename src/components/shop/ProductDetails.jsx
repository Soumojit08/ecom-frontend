import { useState } from "react";
import BreadcrumbUse from "./Breadcrumb";
import { Button } from "../ui/button";
import {
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Input } from "../ui/input";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

const DELIVERY_PERKS = [
  { icon: Truck, text: "Free delivery on orders above ₹500" },
  { icon: ShieldCheck, text: "1 year manufacturer warranty" },
  { icon: RotateCcw, text: "Easy returns & exchanges" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");

  async function fetchProductById() {
    const response = await axiosInstance.get(`/api/get-product/${id}`);
    return response.data.data;
  }

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductById,
  });

  const increaseQty = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return toast.error(error);
  }

  // Parse metadata_specs JSON
  let specs = [];
  if (product.metadata_specs) {
    try {
      const parsedSpecs = JSON.parse(product.metadata_specs);
      specs = Object.entries(parsedSpecs).map(([label, value]) => ({
        label,
        value,
      }));
    } catch (e) {
      console.error("Error parsing specs:", e);
    }
  }

  return (
    <section className="min-h-screen w-full pb-20">
      {/* Breadcrumb */}
      <div className="w-full py-3 flex items-center px-16 bg-muted mb-10">
        <BreadcrumbUse />
      </div>

      {/* Main product section */}
      <section className="flex gap-12 items-start px-16 max-w-7xl mx-auto">
        {/* ---------------- Left: Gallery ---------------- */}
        <div className="w-2/5 shrink-0 sticky top-6 flex flex-col items-center gap-5">
          <div className="w-full aspect-square rounded-3xl border border-border bg-card flex items-center justify-center p-10">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500?text=No+Image";
              }}
            />
          </div>

          {/* Thumbnail strip — reuses main image */}
          <div className="flex gap-3 w-full">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                className={cn(
                  "flex-1 aspect-square rounded-xl border-2 bg-card flex items-center justify-center p-2 transition-colors",
                  i === 0
                    ? "border-primary"
                    : "border-border hover:border-primary/50",
                )}
              >
                <img
                  src={product.image_url}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-contain opacity-90"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/500?text=No+Image";
                  }}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1 gap-2">
              <Heart size={18} />
              Wishlist
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </div>

        {/* ---------------- Right: Info ---------------- */}
        <div className="w-3/5 flex flex-col">
          <Badge className="w-fit mb-3 bg-accent text-accent-foreground hover:bg-accent">
            In Stock
          </Badge>

          <h1 className="text-4xl font-sora uppercase text-secondary-foreground mb-3 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            {product.rating_count > 0 ? (
              <>
                <div className="bg-secondary px-2 py-1 rounded-md inline-flex items-center gap-1 text-sm">
                  <span className="font-medium">
                    {(product.rating_count / 1000).toFixed(1)}
                  </span>
                  <Star size={14} className="fill-green-700 text-green-700" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating_count.toLocaleString()} ratings
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">
                No ratings yet
              </span>
            )}
          </div>

          {/* Price */}
          <div id="price" className="flex items-end gap-2 mb-1">
            <span className="text-4xl font-bold text-secondary-foreground">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Inclusive of all taxes
          </p>

          <Separator className="mb-6" />

          {/* Quantity */}
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3 block">
              Quantity
            </Label>
            <div className="flex items-center gap-3 w-fit border border-border rounded-xl p-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-8 w-8"
                onClick={decreaseQty}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-8 w-8"
                onClick={increaseQty}
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button variant="default" size="lg" className="flex-1">
              Buy Now
            </Button>
          </div>

          {/* Delivery */}
          <div id="address" className="w-full mb-8">
            <h2 className="text-xl font-semibold mb-3">Delivery Details</h2>
            <FieldGroup>
              <Field>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    className="w-1/3"
                    placeholder="Enter PIN Code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <Button variant="default" size="lg">
                    Check
                  </Button>
                </div>
              </Field>
            </FieldGroup>

            <div className="flex flex-col gap-2.5 mt-4">
              {DELIVERY_PERKS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <Icon size={16} className="text-primary shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Product Info */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold mb-3">Product Information</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Brand</span>
                <span className="font-medium text-secondary-foreground capitalize">
                  {product.brand}
                </span>
              </li>
              <li className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-secondary-foreground capitalize">
                  {product.category?.replace(/-/g, " ")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Description / Specs Accordion ---------------- */}
      <section className="px-16 max-w-7xl mx-auto mt-14">
        {specs.length > 0 && (
          <Accordion
            type="multiple"
            defaultValue={["specs"]}
            className="w-full"
          >
            <AccordionItem value="specs">
              <AccordionTrigger className="text-xl font-semibold">
                Specifications
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between border-b border-border py-2 text-sm"
                    >
                      <span className="text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="font-medium text-secondary-foreground">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </section>
    </section>
  );
};

export default ProductDetails;
