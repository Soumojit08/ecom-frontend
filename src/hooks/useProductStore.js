import { create } from "zustand";

const useProducts = create((set)=> ({
    products: [],
    fetchProducts : () => set((state) => ({products : state.products.append }))
}))

export default {useProducts};