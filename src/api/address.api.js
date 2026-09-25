import axiosInstance from "@/lib/axios";

export const getUserAddresses = async () => {
  const response = await axiosInstance.get("/api/addresses");
  return response.data?.data ?? [];
};

export const saveUserAddress = async (payload) => {
  const response = await axiosInstance.post("/api/addresses", payload);
  return response.data?.data ?? response.data;
};
