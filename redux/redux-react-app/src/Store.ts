import { configureStore } from "@reduxjs/toolkit";
import counter from "./conteiner/counter/slice";
import cart from "./conteiner/cart/slice";
export const store = configureStore({ reducer: { counter, cart } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
