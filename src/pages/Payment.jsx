import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { cartKeys } from "@/hooks/useCartData";
import { orderKeys, useCreateOrder } from "@/hooks/useOrders";
import { useQueryClient } from "@tanstack/react-query";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  const clearCart = useCart((state) => state.clearCart);
  const createOrderMutation = useCreateOrder();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const checkoutData = location.state ?? {};
  const { address, paymentMethod = "razorpay" } = checkoutData;
  const addressId = checkoutData.addressId ?? address?.id;

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      ),
    [items],
  );

  const delivery = subtotal >= 5000 ? 0 : 99;
  const total = subtotal + delivery;

  useEffect(() => {
    if (!address || items.length === 0) {
      navigate("/checkout");
      return;
    }

    const scriptId = "razorpay-checkout-script";
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [address, items, navigate]);

  const createRazorpayOrder = async () => {
    const response = await axiosInstance.post("/api/create-order", {
      addressId,
      currency: "INR",
    });

    return response.data?.data ?? response.data;
  };

  const verifyRazorpayPayment = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) => {
    const response = await axiosInstance.post("/api/verify-payment", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      addressId,
    });

    return response.data;
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      toast.error("Razorpay checkout script did not load");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("pending");

    try {
      const orderData = await createRazorpayOrder();
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const razorpay = new window.Razorpay({
        key: keyId,
        amount: orderData.amount,
        currency: "INR",
        name: "E-com Store",
        description: "Order payment",
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            const verification = await verifyRazorpayPayment(response);

            if (!verification?.success) {
              setPaymentStatus("failed");
              toast.error(verification?.msg ?? "Payment verification failed");
              return;
            }

            setPaymentStatus("success");
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: orderKeys.all }),
              queryClient.invalidateQueries({ queryKey: cartKeys.all }),
            ]);
            clearCart();
            toast.success(verification?.msg ?? "Payment successful");
            navigate("/orders", {
              state: {
                orderPlaced: true,
                payment: response,
                address,
              },
            });
          } catch (error) {
            setPaymentStatus("failed");
            toast.error(
              error?.response?.data?.msg ?? "Payment verification failed",
            );
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: address?.name ?? "User",
          contact: address?.phone ?? "",
          email: "customer@example.com",
        },
        notes: {
          address: `${address?.city ?? ""}, ${address?.pincode ?? ""}`,
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: () => {
            setPaymentStatus("cancelled");
            setIsProcessing(false);
            toast.error("Payment cancelled by user");
          },
        },
      });

      razorpay.open();
    } catch (error) {
      setPaymentStatus("failed");
      setIsProcessing(false);
      toast.error(
        error?.response?.data?.msg ?? "Payment failed. Please try again.",
      );
    }
  };

  const handleOrderPlace = async () => {
    if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
      return;
    }

    createOrderMutation.mutate(
      { addressId },
      {
        onSuccess: () => {
          clearCart();
          navigate("/orders");
        },
      },
    );
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Payment
          </p>
          <h1 className="mt-2 font-sora text-3xl font-semibold">
            Complete your payment
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <p className="font-medium">Selected payment</p>
                  <p className="text-sm text-muted-foreground">
                    {paymentMethod === "razorpay"
                      ? "Razorpay standard checkout"
                      : "Cash on delivery"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                Delivery address
              </p>
              <p className="font-medium">{address?.name ?? "User"}</p>
              <p className="text-sm text-muted-foreground">{address?.phone}</p>
              <p className="text-sm text-muted-foreground">
                {address?.address}, {address?.city}, {address?.state} -{" "}
                {address?.pincode}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                Summary
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/20 p-5">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <ShieldCheck className="size-4" />
              <span className="font-medium">Secure payment</span>
            </div>

            {paymentStatus === "success" ? (
              <div className="space-y-3 text-center">
                <CheckCircle2 className="mx-auto size-12 text-green-500" />
                <p className="font-semibold text-green-600">
                  Payment successful
                </p>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed.
                </p>
              </div>
            ) : paymentStatus === "failed" || paymentStatus === "cancelled" ? (
              <div className="space-y-3 text-center">
                <XCircle className="mx-auto size-12 text-red-500" />
                <p className="font-semibold text-red-600">
                  {paymentStatus === "cancelled"
                    ? "Payment cancelled"
                    : "Payment failed"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Please try again or choose another payment method.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pay securely using Razorpay standard checkout.
                </p>
                <Button
                  className="w-full"
                  onClick={handleOrderPlace}
                  disabled={isProcessing || createOrderMutation.isPending}
                >
                  {isProcessing || createOrderMutation.isPending
                    ? "Processing..."
                    : paymentMethod === "razorpay"
                      ? `Pay ${formatPrice(total)}`
                      : "Place order"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
