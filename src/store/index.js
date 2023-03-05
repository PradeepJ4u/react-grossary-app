import { configureStore } from "@reduxjs/toolkit";
import { baseItemReducer } from "./baseItemSlice";
import { cartReducer } from "./cartSlice";
import { currentTabReducer } from "./selectedTabSlice";
import { uiReducer } from "./ui";
import { userReducer } from "./userDataSlice";

const store = configureStore({
  reducer: {
    baseItem: baseItemReducer,
    ui: uiReducer,
    currentTab: currentTabReducer,
    user: userReducer,
    cart:cartReducer
  },
});

export default store;
