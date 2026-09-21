import axiosInstance from "@/lib/axios";

export const getOrders = async () => {
  const response = await axiosInstance.get("/api/orders");
  return response.data?.data ?? [];
};
