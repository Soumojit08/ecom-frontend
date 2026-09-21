import axiosInstance from "@/lib/axios";

export const getAdminOverview = async () => {
  const response = await axiosInstance.get("/api/get-product");
  return response.data?.data ?? [];
};
