import axiosInstance from "@/lib/axios";

export const getCartData = async () => {
  const response = await axiosInstance.get("/api/cart");
  return response.data?.data ?? null;
};

export const addCartItem = async ({ productId, quantity = 1 }) => {
  const response = await axiosInstance.post("/api/cart/items", {
    productId: Number(productId),
    quantity: Number(quantity),
  });
  return response.data?.data ?? response.data;
};

export const updateCartItem = async ({ productId, quantity }) => {
  const response = await axiosInstance.patch(`/api/cart/items/${productId}`, {
    quantity: Number(quantity),
  });
  return response.data?.data ?? response.data;
};

export const removeCartItem = async (productId) => {
  const response = await axiosInstance.delete(`/api/cart/items/${productId}`);
  return response.data?.data ?? response.data;
};
