import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type CartListItemType = { id: number; title: string; amount: number };
export interface CartState {
  list: CartListItemType[];
}
const initialState: CartState = {
  list: [{ id: 1, title: "Test", amount: 3 }],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ title: string }>) => {
      state.list.push({
        id: Math.floor(Math.random() * 1000),
        title: action.payload.title,
        amount: 1,
      });
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    updateAmount(state, action: PayloadAction<{ id: number; amount: number }>) {
      const item = state.list.find((item) => item.id === action.payload.id);
      if (item && action.payload.amount > 0) {
        item.amount = action.payload.amount;
      }
    },
  },
});
export const { add, remove, updateAmount } = cartSlice.actions;
export default cartSlice.reducer;
