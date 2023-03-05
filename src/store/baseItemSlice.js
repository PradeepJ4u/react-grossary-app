import { createSlice } from "@reduxjs/toolkit";

const defaultBaseItem = {
  baseItems: [],
  totalItems: 0,
  totalCategories: 0,
};
const baseItemSlice = createSlice({
  name: "baseItems",
  initialState: defaultBaseItem,
  reducers: {
    replaceBaseItems(state, action) {
      state.baseItems = action.payload.baseItems;
      state.totalItems = action.payload.totalItems;
      state.totalCategories = action.payload.baseItems.length;
    },
    addItemTobaseItems(state, action) {
      state.totalItems++;
      const newItem = action.payload;
      const existingFinalListItemIndex = state.baseItems.findIndex(
        (item) => item.catigory === newItem.catigory
      );
      const existingBaseCategoryData =
        state.baseItems[existingFinalListItemIndex];
      if (existingBaseCategoryData) {
        existingBaseCategoryData.itemList.push({
          itemId: newItem.itemId,
          itemName: newItem.itemName,
          img: newItem.img,
          isBaseItem: true,
          defaultQuantity: newItem.defaultQuantity,
          defaultUnitQuantity: newItem.defaultUnitQuantity,
          price: newItem.price,
        });
      } else {
        state.baseItems.push(newItem);
        state.totalCategories++;
      }
    },
  },
});

export const baseItemsAction = baseItemSlice.actions;

export const baseItemReducer = baseItemSlice.reducer;
