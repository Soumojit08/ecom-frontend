import axiosInstance from "@/lib/axios";

export const getProducts = async ({ category, search } = {}) => {
  const response = await axiosInstance.get("/api/get-product");
  const items = response.data?.data ?? [];

  const normalizedCategory = category?.trim().toLowerCase();
  const normalizedSearch = search?.trim().toLowerCase();

  return items.filter((product) => {
    const matchesCategory =
      !normalizedCategory ||
      String(product.category ?? "")
        .trim()
        .toLowerCase() === normalizedCategory;

    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch || haystack.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/api/get-product/${id}`);
  return response.data?.data ?? null;
};

export const addProduct = async (payload) => {
  const response = await axiosInstance.post("/api/add-product", payload);
  return response.data;
};
