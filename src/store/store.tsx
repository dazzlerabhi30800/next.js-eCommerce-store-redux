import {
  configureStore,
  createAsyncThunk,
  createSlice,
  Tuple,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storageEngine from "./storage";

export type todo = {
  id: string;
  todo: string;
};

interface todoInterface {
  loading: boolean;
  todos: Array<todo>;
  products: Array<any>;
}

const initialState: todoInterface = {
  loading: false,
  todos: [],
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts/",
  async () => {
    const data = await fetch("https://dummyjson.com/products");
    const response = await data.json();
    return response;
  }
);

const productSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: number }) => {
      state.products = state.products.map((item: any) => {
        if (action.payload === item.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    removeCart: (state, action: { payload: number }) => {
      state.products = state.products.map((item: any) => {
        if (action.payload === item.id) {
          return {
            ...item,
            quantity: item.quantity - 1 <= 0 ? 0 : item.quantity - 1,
          };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products?.map((item: any) => ({
        ...item,
        quantity: 0,
      }));
    });
  },
});

const persistConfig = {
  key: "productSlice",
  blacklist: ["loading"],
  whiteList: ["products"],
  // storage,
  storage: storageEngine,
  // timeout: 1000,
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer: persistReducer(persistConfig, productSlice.reducer),
    },
    middleware: () => new Tuple(thunk),
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false,
    //   }),
  });
};

export const persistor = persistStore(makeStore());

export const { addToCart, removeCart } = productSlice.actions;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
