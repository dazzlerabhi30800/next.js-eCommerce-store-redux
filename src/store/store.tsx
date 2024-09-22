import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProductState {
  loading: boolean;
  products: any[];
  todo: string;
  setProducts: () => void;
  addToCart: (id: number) => void;
  setTodo: (todo: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      loading: false,
      todo: "status",
      products: [],
      setTodo: (todo) => set({ todo }),
      setProducts: async () => {
        const products = JSON.parse(
          sessionStorage.getItem("products") || "null"
        );
        set({ loading: true });
        if (products) {
          console.log("got it");
          set({ products: products.state.products, loading: false });
          return;
        }
        const data = await fetch("https://dummyjson.com/products");
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
    }),
    {
      name: "products",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        products: state.products,
        setProducts: state.setProducts,
        addToCart: state.addToCart,
        todo: state.todo,
      }),
    }
  )
);
