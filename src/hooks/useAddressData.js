import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getUserAddresses, saveUserAddress } from "@/api/address.api";

export const addressKeys = {
  all: ["addresses"],
};

export const useAddressData = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: addressKeys.all,
    queryFn: getUserAddresses,
    enabled,
    staleTime: 30_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

export const useSaveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
      toast.success("Address saved successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg ?? "Could not save address");
    },
  });
};
