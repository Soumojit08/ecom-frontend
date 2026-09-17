import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import { Spinner } from "@/components/ui/spinner";
import useWishList from "@/hooks/useWishList";

const fetchWishlist = async () => {
  const response = await axiosInstance.get("/api/wishlist");
  return response.data?.data ?? null;
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const Wishlist = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const setWishlist = useWishList((state) => state.setWishlist);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    enabled: isLoaded && isSignedIn,
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setWishlist(data);
    }
  }, [data, setWishlist]);

  const items =
    data?.wishListItems?.map(({ productId, product }) => ({
      productId,
      ...product,
    })) ?? [];

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
        <Card className="mx-auto max-w-md border-dashed border-border bg-background">
          <CardContent className="flex flex-col items-center justify-center px-8 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="font-sora text-2xl font-semibold">
              Sign in to view your wishlist
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Save products you love and come back anytime.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4">
        <Card className="mx-auto max-w-md border-dashed border-border bg-background">
          <CardContent className="flex flex-col items-center justify-center px-8 py-12 text-center">
            <h2 className="font-sora text-2xl font-semibold">
              Could not load your wishlist
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {error?.response?.data?.msg ?? "Please try again."}
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
                Saved for later
              </p>
            </div>
            <h1 className="font-sora text-3xl font-semibold tracking-tight sm:text-4xl">
              Wishlist
            </h1>
          </div>

          <Button variant="outline" className="w-fit gap-2 rounded-full">
            Continue shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {items.length === 0 ? (
          <Card className="mx-auto max-w-xl border-dashed border-border bg-background">
            <CardContent className="flex flex-col items-center justify-center px-8 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-7 w-7" />
              </div>
              <h2 className="font-sora text-2xl font-semibold">
                Your wishlist is empty
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Save products you love and come back later to compare, review,
                and buy.
              </p>
              <Button className="mt-6 gap-2 rounded-full">
                Explore products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="overflow-hidden rounded-[28px] border border-border/80 bg-background">
              <div className="flex items-center justify-between gap-4 border-b border-border/80 px-4 py-4 sm:px-6">
                <div>
                  <h2 className="font-sora text-xl font-semibold text-foreground">
                    My wishlist
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {items.length} {items.length === 1 ? "item" : "items"} saved
                  </p>
                </div>
              </div>

              <div className="divide-y divide-border/80">
                {items.map((item) => (
                  <article
                    key={item.productId}
                    className="grid gap-3 px-4 py-4 sm:grid-cols-[84px_minmax(0,1fr)_auto] sm:items-center sm:px-6 sm:py-5"
                  >
                    <div className="flex h-20 items-center justify-center overflow-hidden rounded-xl bg-muted/70 p-2">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {item.brand}
                      </p>
                      <h3 className="truncate font-sora text-base font-semibold leading-tight text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.category}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="rounded-full"
                        >
                          <ShoppingBag className="mr-1 h-4 w-4" />
                          Add to cart
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-end sm:min-w-[120px]">
                      <p className="font-sora text-lg font-semibold tracking-tight text-foreground">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="lg:pt-1">
              <div className="rounded-[26px] border border-border/80 bg-[#f8f7f5] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                      Curated list
                    </p>
                    <h3 className="mt-1 font-sora text-xl font-semibold text-foreground">
                      Wishlist summary
                    </h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-background px-3 py-2.5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Items</span>
                      <span className="font-medium text-foreground">
                        {items.length}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-background px-3 py-2.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">
                        Estimated total
                      </span>
                      <span className="font-sora text-lg font-semibold tracking-tight text-foreground">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  <Button className="w-full gap-2 rounded-full" size="lg">
                    <ShoppingBag className="h-4 w-4" />
                    Add all to cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 rounded-full"
                    size="lg"
                  >
                    Browse products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
