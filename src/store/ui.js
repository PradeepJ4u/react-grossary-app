import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  showAddItem: false,
  showCart: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
  reducers: {
    toggleAddItem(state) {
      state.showAddItem = !state.showAddItem;
    },
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
  },
});

export const uiAction = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
