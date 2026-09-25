import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "@/api/orders.api";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const orderKeys = {
  all: ["orders"],
};

export const useOrders = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: orderKeys.all,
    queryFn: getOrders,
    enabled,
    retry: 1,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

export const createOrder = async (payload) => {
  const response = await axiosInstance.post("/api/orders", payload);
  return response.data?.data ?? response.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg ?? "Could not place the order");
    },
  });
};
