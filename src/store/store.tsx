import { fetchCategory } from "@/utils/FetchFuncs";
import { User } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type cart = {
  id: number;
  thumbnail: string;
  title: string;
  quantity: number;
  price: number;
};

export type product = {
  id: number;
  thumbnail: string;
  title: string;
  quantity: number;
  price: number;
  description: string;
  category: string;
  rating: number;
  discountPercentage: number;
};

interface ProductState {
  loading: boolean;
  productLoading: boolean;
  products: product[];
  showSidebar: boolean;
  cart: cart[];
  categories: category[];
  user: User | null;
  setProducts: () => void;
  setUser: (user: User | null) => void;
  setCategories: () => void;
  setSidebar: () => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  fetchNewProducts: (slug: string) => void;
  setProductAmount: () => void;
  setProductLoading: (value: boolean) => void;
  emptyCart: () => void;
  removeItem: (id: number) => void;
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
        const cart = get().cart;
        const products = get().products;
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
            products: response.products.map((item: product) => ({
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
        const itemFind = get().cart.find((item) => item.id === id);
        const productItem = get().products.find((item) => item.id === id);
        if (!productItem) return;
        if (!itemFind) {
          set({
            cart: [
              ...cart,
              {
                title: productItem?.title,
                price: productItem?.price,
                thumbnail: productItem?.thumbnail,
                id: productItem?.id,
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
        const itemFind = get().cart.find((item) => item.id === id);
        if (!itemFind) return;
        const newCart = cart.map((item) => {
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
            showSidebar: false,
            products: response.products?.map((item: product) => ({
              ...item,
              quantity: 0,
            })),
            loading: false,
          });

          document.body.classList.remove("overflowHidden");
          get().setProductAmount();
        }
      },
      removeItem: (id) => {
        const products = get().products;
        const cart = get().cart;
        if (!id) return;
        set({
          products: products.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: 0 };
            }
            return item;
          }),
          cart: cart.filter((item) => item.id !== id),
        });
      },
    }),
    {
      name: "products",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart.filter((item: cart) => item?.quantity > 0),
        categories: state.categories,
        user: state.user,
      }),
    },
  ),
);
