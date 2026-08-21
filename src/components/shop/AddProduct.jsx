import axiosInstance from "@/lib/axios";
import { Input } from "../ui/input";
import { useState } from "react";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = async (formData) => {
    const res = await axiosInstance.post("/api/add-product", formData);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => toast.success("Product added"),
    onError: () => toast.error("Failed Adding Product"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const parsedPrice = Number(price);

    if (
      !trimmedName ||
      !trimmedCategory ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice <= 0
    ) {
      toast.error("Enter a product name, category, and a valid price");
      return;
    }

    const data = {
      brand: brand.trim(),
      name: trimmedName,
      category: trimmedCategory,
      price,
    };

    mutation.mutate(data);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <Label>Brand</Label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="eg. Amd.."
            />
          </Field>

          <Field>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="eg. AMD HMSC..."
            />
          </Field>

          <Field>
            <Label>Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="eg. motherboard.."
            />
          </Field>

          <Field>
            <Label>Price</Label>
            <Input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="eg. 11999"
            />
          </Field>
        </FieldGroup>
        <Button variant="default" type="submit">
          Add Product
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
