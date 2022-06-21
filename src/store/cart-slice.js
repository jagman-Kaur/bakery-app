import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.amount++;
      } else {
        state.items.push(action.payload);
      }

      state.totalAmount += action.payload.price * action.payload.amount;
    },
    removeItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existingItem.amount--;
      }
      state.totalAmount -= existingItem.price;
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

const store = configureStore({ reducer: cartSlice.reducer });

export const cartActions = cartSlice.actions;
export default store;
