import { configureStore, createSlice } from "@reduxjs/toolkit";

export type todo = {
  id: string;
  todo: string;
};

interface todoInterface {
  loading: boolean;
  todos: Array<todo>;
}

const initialState: todoInterface = {
  loading: false,
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action: { payload: todo }) => {
      console.log(action.payload);
      state.todos = [...state.todos, action.payload];
    },
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoReducer: todoSlice.reducer,
    },
  });
};

export const { addTodos } = todoSlice.actions;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
