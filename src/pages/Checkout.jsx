import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  Check,
  ArrowLeft,
  Truck,
  Plus,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import useCart from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useAddressData, useSaveAddress } from "@/hooks/useAddressData";

const paymentOptions = [
  {
    id: "cod",
    label: "Cash on delivery",
    description: "Pay when your order arrives",
  },
  {
    id: "upi",
    label: "UPI / Wallet",
    description: "Pay using GPay, PhonePe, Paytm",
  },
  {
    id: "card",
    label: "Debit / Credit card",
    description: "Secure card payment",
  },
];

const emptyForm = {
  city: "",
  country: "",
  pincode: "",
  phone: "",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const steps = [
  { id: 1, label: "Address" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items } = useCart();
  const createOrderMutation = useCreateOrder();
  const { data: addressData = [], isLoading: isAddressLoading } =
    useAddressData();
  const saveAddressMutation = useSaveAddress();

  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const addresses = useMemo(
    () => (Array.isArray(addressData) ? addressData : []),
    [addressData],
  );

  const activeAddress = useMemo(
    () =>
      addresses.find((address) => address.id === selectedAddressId) ??
      addresses.find((address) => address.isDefault) ??
      addresses[0] ??
      null,
    [addresses, selectedAddressId],
  );

  useEffect(() => {
    if (!selectedAddressId && activeAddress) {
      setSelectedAddressId(activeAddress.id);
    }
  }, [activeAddress, selectedAddressId]);

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

  const filledAddress =
    formData.city && formData.country && formData.pincode && formData.phone;

  const nextStep = () => setStep((current) => Math.min(current + 1, 3));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));

  const updateField = (field) => (event) =>
    setFormData((current) => ({ ...current, [field]: event.target.value }));

  const handleAddressSubmit = () => {
    if (!filledAddress) return;

    const payload = {
      city: formData.city,
      pincode: formData.pincode,
      country: formData.country || "India",
      phone: formData.phone,
      isDefault: addresses.length === 0,
    };

    saveAddressMutation.mutate(payload, {
      onSuccess: (savedAddress) => {
        setSelectedAddressId(Number(savedAddress?.id ?? Date.now()));
        setShowAddressForm(false);
        setFormData(emptyForm);
      },
    });
  };

  const handlePlaceOrder = () => {
    if (items.length === 0 || !activeAddress) return;

    const orderPayload = {
      id: `ORD-${Date.now()}`,
      orderId: `ORD-${Date.now()}`,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      total,
      subtotal,
      delivery,
      paymentMethod: selectedPayment,
      address: activeAddress,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    };

    createOrderMutation.mutate(orderPayload, {
      onSuccess: () => navigate("/orders"),
    });
  };

  const canContinueFromAddress = Boolean(activeAddress) && !showAddressForm;

  if (items.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] max-w-4xl items-center justify-center px-4 py-12 mx-auto">
        <div className="w-full max-w-md text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MapPin className="size-6" />
          </div>
          <div>
            <h1 className="font-sora text-2xl font-semibold">
              Your cart is empty
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a few products before starting checkout.
            </p>
          </div>
          <Button onClick={() => navigate("/shop")}>Continue shopping</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
            Secure checkout
          </p>
          <h1 className="font-sora text-3xl font-semibold tracking-tight sm:text-4xl">
            Complete your order
          </h1>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_340px]">
          {/* Main column */}
          <section className="space-y-8">
            {/* Stepper */}
            <div className="flex items-center gap-3 border-b pb-6">
              {steps.map(({ id, label }, i) => (
                <div key={id} className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                      step >= id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > id ? <Check className="size-4" /> : id}
                  </div>
                  <span
                    className={`text-sm ${step >= id ? "font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                  {i !== steps.length - 1 && (
                    <div className="h-px w-10 bg-border ml-2" />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="size-4 text-primary" />
                  Select delivery address
                </h2>

                {isAddressLoading ? (
                  <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
                    Loading saved addresses...
                  </div>
                ) : addresses.length === 0 && !showAddressForm ? (
                  <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">No saved addresses yet</p>
                      <p className="text-sm text-muted-foreground">
                        Add a delivery address to continue.
                      </p>
                    </div>
                    <Button onClick={() => setShowAddressForm(true)}>
                      <Plus className="size-4" />
                      Add address
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`w-full rounded-lg border px-4 py-3.5 text-left transition ${
                          selectedAddressId === address.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium">{address.label}</span>
                          {selectedAddressId === address.id && (
                            <Badge className="font-normal">Selected</Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm">
                          {address.name} | Ph - {address.phone}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {address.address}, {address.city}, {address.state} -{" "}
                          {address.pincode}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {!showAddressForm && addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Plus className="size-4" />
                    Add a new address
                  </button>
                )}

                {showAddressForm && (
                  <div className="space-y-4 rounded-lg border p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={updateField("phone")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={updateField("country")}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={updateField("city")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={updateField("pincode")}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      {addresses.length > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        disabled={
                          !filledAddress || saveAddressMutation.isPending
                        }
                        onClick={handleAddressSubmit}
                      >
                        {saveAddressMutation.isPending
                          ? "Saving..."
                          : "Save address"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <CreditCard className="size-4 text-primary" />
                  Choose payment method
                </h2>

                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="space-y-2"
                >
                  {paymentOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3.5 transition hover:border-primary/40"
                    >
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <ShieldCheck className="size-4 text-primary" />
                  Review and place order
                </h2>

                <div className="space-y-4 divide-y">
                  <div className="pb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Delivery address
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <Pencil className="size-3" /> Edit
                      </button>
                    </div>
                    {activeAddress && (
                      <>
                        <p className="mt-2 font-medium">{activeAddress.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {activeAddress.phone}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {activeAddress.address}, {activeAddress.city},{" "}
                          {activeAddress.state} - {activeAddress.pincode}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Payment method
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <Pencil className="size-3" /> Edit
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 font-medium">
                      <CreditCard className="size-4 text-primary" />
                      {
                        paymentOptions.find((o) => o.id === selectedPayment)
                          ?.label
                      }
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Order items
                    </p>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatPrice(Number(item.price) * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="flex items-center justify-between gap-3 border-t pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button
                  onClick={nextStep}
                  disabled={step === 1 && !canContinueFromAddress}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending
                    ? "Placing order..."
                    : "Place order"}
                </Button>
              )}
            </div>
          </section>

          {/* Summary column */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-lg border p-6">
              <h2 className="font-sora text-xl font-semibold">Order summary</h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                <span className="font-semibold">Total</span>
                <span className="font-sora text-xl font-semibold">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="size-4 text-primary" />
                  Free delivery on orders above ₹5000
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  Secure checkout and protected payments
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
