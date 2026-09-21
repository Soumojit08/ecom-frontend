import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, getProductById, getProducts } from "@/api/products.api";
import toast from "react-hot-toast";

export const productKeys = {
  all: ["products"],
  list: (filters = {}) => ["products", "list", filters],
  detail: (id) => ["products", "detail", id],
};

export const useProducts = (filters = {}) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
    staleTime: 60_000,
  });

export const useProductById = (id) =>
  useQuery({
    queryKey: productKeys.detail(id),
    enabled: !!id,
    queryFn: () => getProductById(id),
    staleTime: 60_000,
  });

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added");
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    onError: () => {
      toast.error("Failed adding product");
    },
  });
};
