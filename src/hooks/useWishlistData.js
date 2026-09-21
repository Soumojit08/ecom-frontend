import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addWishlistItem,
  getWishlistData,
  removeWishlistItem,
} from "@/api/wishlist.api";
import toast from "react-hot-toast";

export const wishlistKeys = {
  all: ["wishlist"],
};

export const useWishlistData = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: wishlistKeys.all,
    queryFn: getWishlistData,
    enabled,
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

export const useAddWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
      toast.success("Added to wishlist");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg ?? "Could not add item to wishlist",
      );
    },
  });
};

export const useRemoveWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg ?? "Could not remove item from wishlist",
      );
    },
  });
};
