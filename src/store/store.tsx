import { fetchCategory } from "@/utils/FetchFuncs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProductState {
  loading: boolean;
  productLoading: boolean;
  products: any[];
  showSidebar: boolean;
  cart: any[];
  categories: category[];
  user: any;
  setProducts: () => void;
  setUser: (user: any) => void;
  setCategories: () => void;
  setSidebar: () => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  fetchNewProducts: (slug: string) => void;
  setProductAmount: () => void;
  setProductLoading: (value: boolean) => void;
  emptyCart: () => void;
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
      productLoading: false,
      showSidebar: false,
      categories: [],
      user: null,
      products: [],
      cart: [],
      setSidebar: () => {
        const sideState = get().showSidebar;
        if (sideState) {
          document.body.classList.remove("overflowHidden");
          set({ showSidebar: false });
        } else {
          document.body.classList.add("overflowHidden");
          set({ showSidebar: true });
        }
      },
      setProductLoading: (value) => set({ loading: value }),
      setProductAmount: () => {
        set({ productLoading: true });
        let cart = get().cart;
        let products = get().products;
        if (cart.length < 1) {
          setTimeout(() => {
            set({
              productLoading: false,
              products: products.map((item) => ({ ...item, quantity: 0 })),
            });
          }, 500);
          return;
        }
        for (let i = 0; i < cart.length; i++) {
          for (let j = 0; j < products.length; j++) {
            if (cart[i].id === products[j].id) {
              products[j].quantity = cart[i].quantity;
            }
          }
        }
        setTimeout(() => {
          set({
            products,
            productLoading: false,
          });
        }, 1000);
      },
      setProducts: async () => {
        set({ loading: true });
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
        get().setProductAmount();
      },
      setCategories: async () => {
        const categories = await fetchCategory();
        set({ categories });
      },
      addToCart: async (id) => {
        if (!id) return;
        const cart = get().cart;
        let itemFind = get().cart.find((item) => item.id === id);
        let productItem = get().products.find((item) => item.id === id);
        if (!itemFind) {
          set({
            cart: [
              ...cart,
              {
                title: productItem.title,
                price: productItem.price,
                thumbnail: productItem.thumbnail,
                id: productItem.id,
                quantity: 1,
              },
            ],
          });
        } else {
          set({
            cart: cart.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            }),
          });
        }
      },
      removeFromCart: (id) => {
        if (!id || !get().user) return;
        const cart = get().cart;
        let itemFind = get().cart.find((item) => item.id === id);
        if (!itemFind) return;
        let newCart = cart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1 < 1 ? 0 : item.quantity - 1,
            };
          }
          return item;
        });
        set({
          cart: newCart,
        });
      },
      setUser: (user) => {
        set({ user });
      },
      emptyCart: () =>
        set({
          cart: [],
          products: get().products.map((item) => ({ ...item, quantity: 0 })),
        }),
      fetchNewProducts: async (slug) => {
        set({ loading: true });
        const data = await fetch(
          `https://dummyjson.com/products/category/${slug}`,
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

          document.body.classList.remove("overflowHidden");
          get().setProductAmount();
        }
      },
    }),
    {
      name: "products",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart.filter((item: any) => item.quantity > 0),
        categories: state.categories,
        user: state.user,
      }),
    },
  ),
);
