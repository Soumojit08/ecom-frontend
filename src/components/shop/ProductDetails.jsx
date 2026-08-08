import { useState } from "react";
import products from "@/data/index";
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
  Check,
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

// ---------------------------------------------------------------------------
// DUMMY DATA — placeholders until the real product schema/API is wired up.
// Shape mirrors what a real product record should eventually look like, so
// swapping this out later is a drop-in replacement, not a rewrite.
// ---------------------------------------------------------------------------
const DUMMY_VARIANTS = [
  { id: "v1", label: "8GB / 256GB", stock: 12 },
  { id: "v2", label: "16GB / 512GB", stock: 6 },
  { id: "v3", label: "32GB / 1TB", stock: 0 },
];

const DUMMY_HIGHLIGHTS = [
  "LGA1700 socket, supports 12th/13th/14th Gen Intel Core CPUs",
  "Dual channel DDR4 memory, up to 3200MHz",
  "PCIe 4.0 M.2 slot with heatsink for high-speed storage",
  "Realtek 1Gb LAN with LANGuard protection",
];

const DUMMY_SPECS = [
  { label: "Brand", value: "ASUS" },
  { label: "Chipset", value: "Intel H610" },
  { label: "Socket", value: "LGA1700" },
  { label: "Memory Slots", value: "2 x DIMM, Max 64GB" },
  { label: "Form Factor", value: "Micro-ATX" },
  { label: "Warranty", value: "3 Years Manufacturer Warranty" },
];

const DUMMY_DESCRIPTION =
  "Built for reliability and everyday performance, this motherboard pairs a durable power design with practical connectivity. Whether you're assembling a budget workstation or a compact home office rig, it offers steady power delivery, straightforward BIOS controls, and the I/O you actually use.";

const DELIVERY_PERKS = [
  { icon: Truck, text: "Free delivery in 3–5 business days" },
  { icon: RotateCcw, text: "7-day easy return policy" },
  { icon: ShieldCheck, text: "3-year manufacturer warranty" },
];

const ProductDetails = () => {
  const product = products.find((product) => product.id === "mb-001");

  const [selectedVariant, setSelectedVariant] = useState(DUMMY_VARIANTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const discountPercent = 58;
  const mrp = 14900;

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(10, q + 1));

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
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* Thumbnail strip — dummy, reuses main image until gallery data exists */}
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
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-full h-full object-contain opacity-90"
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => setIsWishlisted((v) => !v)}
            >
              <Heart
                className={cn(isWishlisted && "fill-primary text-primary")}
                size={18}
              />
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
            <div className="bg-secondary px-2 py-1 rounded-md inline-flex items-center gap-1 text-sm">
              <span className="font-medium">4.0</span>
              <Star size={14} className="fill-green-700 text-green-700" />
            </div>
            <span className="text-sm text-muted-foreground">3,932 ratings</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-primary hover:underline cursor-pointer">
              See all reviews
            </span>
          </div>

          {/* Price */}
          <div id="price" className="flex items-end gap-2 mb-1">
            <span className="text-3xl font-bold text-green-700">
              {discountPercent}% off
            </span>
            <span className="text-2xl text-muted-foreground line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-4xl font-bold text-secondary-foreground">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Inclusive of all taxes
          </p>

          <Separator className="mb-6" />

          {/* Variant selector */}
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3 block">
              Configuration
            </Label>
            <div className="flex flex-wrap gap-2">
              {DUMMY_VARIANTS.map((variant) => {
                const isSelected = selectedVariant === variant.id;
                const isOutOfStock = variant.stock === 0;
                return (
                  <button
                    key={variant.id}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl border-2 text-sm font-medium transition-colors relative",
                      isSelected
                        ? "border-primary bg-accent text-accent-foreground"
                        : "border-border bg-card hover:border-primary/50",
                      isOutOfStock &&
                        "opacity-40 cursor-not-allowed line-through hover:border-border",
                    )}
                  >
                    {variant.label}
                  </button>
                );
              })}
            </div>
          </div>

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

          {/* Highlights */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold mb-3">Highlights</h2>
            <ul className="flex flex-col gap-2">
              {DUMMY_HIGHLIGHTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Check size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-secondary-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Description / Specs Accordion ---------------- */}
      <section className="px-16 max-w-7xl mx-auto mt-14">
        <Accordion
          type="multiple"
          defaultValue={["description", "specs"]}
          className="w-full "
        >
          <AccordionItem value="description">
            <AccordionTrigger className="text-xl font-semibold">
              Description
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {DUMMY_DESCRIPTION}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specs">
            <AccordionTrigger className="text-xl font-semibold">
              Specifications
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {DUMMY_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between border-b border-border py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-secondary-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reviews">
            <AccordionTrigger className="text-xl font-semibold">
              Ratings &amp; Reviews
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Reviews will be wired up once the reviews API/schema is ready.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ---------------- Related products ---------------- */}
      {relatedProducts.length > 0 && (
        <section className="px-16 max-w-7xl mx-auto mt-16">
          <h2 className="text-2xl font-sora uppercase mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-2xl p-4 bg-card flex flex-col hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="aspect-square flex items-center justify-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-lg font-bold mt-1">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductDetails;
