import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import layoutReducer from "../features/layout/layout-slice";
// import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
