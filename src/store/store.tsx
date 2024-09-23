import { fetchCategory } from "@/utils/FetchFuncs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProductState {
  loading: boolean;
  products: any[];
  showSidebar: boolean;
  categories: category[];
  setProducts: () => void;
  setCategories: () => void;
  setSidebar: () => void;
  addToCart: (id: number) => void;
  fetchNewProducts: (slug: string) => void;
}

export type category = {
  slug: string;
  name: string;
  url: string;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      loading: false,
      showSidebar: false,
      categories: [],
      products: [],
      setSidebar: () => {
        const sideState = get().showSidebar;
        set({ showSidebar: !sideState });
      },
      setProducts: async () => {
        const data = await fetch(`https://dummyjson.com/products`);
        const response = await data.json();
        if (response) {
          set({
            products: response.products.map((item: any) => ({
              ...item,
              quantity: 0,
            })),
            loading: false,
          });
        }
      },
      setCategories: async () => {
        const categories = await fetchCategory();
        set({ categories });
      },
      addToCart: (id) => {
        if (!id) return;
        const oldProducts = get().products;
        set({
          products: oldProducts.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          }),
        });
      },
      fetchNewProducts: async (slug) => {
        set({ loading: true });
        const data = await fetch(
          `https://dummyjson.com/products/category/${slug}`
        );
        const response = await data.json();
        if (response) {
          set({
            products: response.products?.map((item: any) => ({
              ...item,
              quantity: 0,
            })),
            loading: false,
            showSidebar: false,
          });
        }
      },
    }),
    {
      name: "products",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
      }),
    }
  )
);
