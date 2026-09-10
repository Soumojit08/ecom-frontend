import { create } from "zustand";
import { devtools } from "zustand/middleware";

const normalizeCartItems = (cartItems = []) =>
  cartItems.map(({ product, productId, quantity }) => ({
    id: productId,
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    image: product.image_url,
    quantity,
  }));

const useCart = create(
  devtools((set) => ({
    items: [],
    itemCount: 0,

    setCart: (cart) => {
      const items = normalizeCartItems(cart?.cartItems);

      set({
        items,
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
      });
    },

    clearCart: () => set({ items: [], itemCount: 0 }),
  })),
);

export default useCart;
