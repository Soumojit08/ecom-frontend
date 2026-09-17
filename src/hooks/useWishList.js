import { create } from "zustand";
import { devtools } from "zustand/middleware";

const normalizeWishlistItems = (wishlistItems = []) =>
  wishlistItems.map((entry) => {
    const product = entry.product ?? entry;
    const id = entry.productId ?? product.id ?? product._id;

    return {
      id: Number(id),
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image_url ?? product.image,
    };
  });

const useWishList = create(
  devtools((set, get) => ({
    items: [],
    itemIds: [],

    setWishlist: (wishlist) => {
      const items = normalizeWishlistItems(
        wishlist?.wishListItems ?? wishlist ?? [],
      );

      set({
        items,
        itemIds: items.map((item) => item.id),
      });
    },

    addWishlistItem: (product) => {
      const item = normalizeWishlistItems([{ product }])[0];
      const currentItems = get().items;
      const exists = currentItems.some((entry) => entry.id === item.id);

      if (exists) {
        return;
      }

      const nextItems = [item, ...currentItems];
      set({
        items: nextItems,
        itemIds: nextItems.map((entry) => entry.id),
      });
    },

    removeWishlistItem: (productId) => {
      const nextItems = get().items.filter(
        (item) => item.id !== Number(productId),
      );

      set({
        items: nextItems,
        itemIds: nextItems.map((item) => item.id),
      });
    },

    isWishlisted: (productId) => get().itemIds.includes(Number(productId)),

    clearWishlist: () => set({ items: [], itemIds: [] }),
  })),
);

export default useWishList;
