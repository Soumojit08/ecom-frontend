import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCartData,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "@/api/cart.api";
import toast from "react-hot-toast";

export const cartKeys = {
  all: ["cart"],
};

export const useCartData = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: cartKeys.all,
    queryFn: getCartData,
    enabled,
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg ?? "Could not add item to cart");
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg ?? "Could not update your cart");
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg ?? "Could not remove item from cart",
      );
    },
  });
};
