import { devtools } from "zustand/middleware";
import { create } from "zustand";

const store = (set) => ({
  items: [
    {
      productId: "",
      quantity: 0,
      price: 0,
    },
  ],

  addToCart: (productId) => {
    set((state) => ({
      itemsId: state.items,
    }));
  },

  removeFromCart: (productId) => {
    set((state) => ({
      itemsId: state.itemsId,
    }));
  },
});

const useCart = create(devtools(store));

export default useCart;
