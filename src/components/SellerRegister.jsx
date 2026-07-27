import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const SellerRegister = () => {
  return (
    <section className="px-12 flex items-center justify-arround gap-12 my-10">
      <Card className="flex max-w-4xl p-4 h-72">
        <div>
          <div>
            <h2 className="font-barlow text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Grow your store with our marketplace.
            </h2>
            <p className="my-2 max-w-xl leading-6 text-muted-foreground">
              Join a curated network of sellers, reach thousands of shoppers,
              and get personalized support to launch your products faster.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-3xl">
              <Card className="rounded-lg bg-muted">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    Fast Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-foreground">
                    Our team helps you onboard and list your first product
                    quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-lg bg-muted">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    Trusted Platform
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <p className="text-sm leading-6 text-foreground">
                      Sell with confidence using a modern storefront designed
                      for performance.
                    </p>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="w-xl h-72 p-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="input-seller-email"
              type="text"
              placeholder="example@email.com"
            />
          </Field>
          <Field>
            <Field>
              <FieldLabel>Product Details</FieldLabel>
              <Input
                id="input-seller-email"
                type="text"
                placeholder="Laptop Retailer, Graphics Card Supplier etc."
              />
              <FieldDescription>
                Our team will reach out to you very soon
              </FieldDescription>
            </Field>
            <div className="flex items-center gap-2">
              <Button variant="default" size="lg">
                Submit
              </Button>
              <Button variant="link">
                Contact Us via Instagram
                <span>
                  <ArrowRight size={24} />
                </span>
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </Card>
    </section>
  );
};

export default SellerRegister;
