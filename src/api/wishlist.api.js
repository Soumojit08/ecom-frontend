import axiosInstance from "@/lib/axios";

export const getWishlistData = async () => {
  const response = await axiosInstance.get("/api/wishlist");
  return response.data?.data ?? null;
};

export const addWishlistItem = async (productId) => {
  const response = await axiosInstance.post("/api/wishlist/items", {
    productId: Number(productId),
  });
  return response.data?.data ?? response.data;
};

export const removeWishlistItem = async (productId) => {
  const response = await axiosInstance.delete(
    `/api/wishlist/items/${productId}`,
  );
  return response.data?.data ?? response.data;
};
