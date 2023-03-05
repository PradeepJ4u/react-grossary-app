import { createSlice } from "@reduxjs/toolkit";

const defaultCart = {
  orderDate: "",
  itemList: [],
  totalItems: 0,
  totalCategories: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCart,
  reducers: {
    updateOrderDate(state, action) {
      if (state.orderDate === "") state.orderDate = action.payload.orderDate;
    },
    addItemToCart(state, action) {
      console.log(action.payload);
      //Add Item: updating total Price
      state.totalItems++;
      state.totalPrice =
        state.totalPrice +
        action.payload.item.catigoryItemData.price *
          action.payload.item.catigoryItemData.amount;

      //Add Item: updating CartList
      const existingCatigoryIndex = state.itemList.findIndex(
        (catigoryItem) => catigoryItem.catigory === action.payload.item.catigory
      );
      const existingCatigoryItem = state.itemList[existingCatigoryIndex];
      if (existingCatigoryItem) {
        //catiogory found
        const existingItemIndex =
          existingCatigoryItem.catigoryItemList.findIndex(
            (catigoryItem) =>
              catigoryItem.itemId ===
              action.payload.item.catigoryItemData.itemId
          );
        const existingItemData =
          existingCatigoryItem.catigoryItemList[existingItemIndex];
        if (existingItemData) {
          //existing item found
          const updatedItemData = {
            ...existingItemData,
            amount:
              existingItemData.amount +
              action.payload.item.catigoryItemData.amount,
          };
          existingCatigoryItem.catigoryItemList[existingItemIndex] =
            updatedItemData;
        } else {
          //existing item not found
          const currentItemList = existingCatigoryItem.catigoryItemList;
          const finalStateItemList = {
            catigory: action.payload.item.catigory,
            catigoryItemList: [
              ...currentItemList,
              action.payload.item.catigoryItemData,
            ],
          };
          state.itemList[existingCatigoryIndex] = finalStateItemList;
        }
      } else {
        //catigory not found
        const finalStateItemList = {
          catigory: action.payload.item.catigory,
          catigoryItemList: [action.payload.item.catigoryItemData],
        };
        state.itemList.push(finalStateItemList);
      }
      state.totalCategories = state.itemList.length
    },
    removeItemFromCart(state, action) {
      console.log(action.payload);
      let updatedItemList = [];
      let currentItemPrice = 0;

      const existingList = state.itemList;

      for (let i = 0; i < existingList.length; i++) {
        for (let j = 0; j < existingList[i].catigoryItemList.length; j++) {
          let updatedCartigoryItem = null;
          console.log(existingList[i].catigoryItemList[j].itemId);
          console.log(action.payload.itemId);
          if (existingList[i].catigoryItemList[j].itemId === action.payload) {
            currentItemPrice = existingList[i].catigoryItemList[j].price;
            if (existingList[i].catigoryItemList[j].amount > 1) {
              updatedCartigoryItem = {
                catigory: existingList[i].catigory,
                catigoryItemList: [
                  {
                    itemId: existingList[i].catigoryItemList[j].itemId,
                    itemName: existingList[i].catigoryItemList[j].itemName,
                    defaultQuantity:
                      existingList[i].catigoryItemList[j].defaultQuantity,
                    defaultUnitQuantity:
                      existingList[i].catigoryItemList[j].defaultUnitQuantity,
                    amount: existingList[i].catigoryItemList[j].amount - 1,
                    price: existingList[i].catigoryItemList[j].price,
                  },
                ],
              };
              const existingCatigoryIndex = updatedItemList.findIndex(
                (listItem) =>
                  listItem.catigory === updatedCartigoryItem.catigory
              );
              const exisitngCatigoryItem =
                updatedItemList[existingCatigoryIndex];
              let updatedItem = null;
              if (exisitngCatigoryItem) {
                updatedItem = {
                  catigory: exisitngCatigoryItem.catigory,
                  catigoryItemList:
                    exisitngCatigoryItem.catigoryItemList.concat(
                      updatedCartigoryItem.catigoryItemList
                    ),
                };
                updatedItemList[existingCatigoryIndex] = updatedItem;
              } else {
                updatedItem = updatedCartigoryItem;
                updatedItemList.push(updatedItem);
              }
            }
          } else {
            updatedCartigoryItem = {
              catigory: existingList[i].catigory,
              catigoryItemList: [
                {
                  itemId: existingList[i].catigoryItemList[j].itemId,
                  itemName: existingList[i].catigoryItemList[j].itemName,
                  defaultQuantity:
                    existingList[i].catigoryItemList[j].defaultQuantity,
                  defaultUnitQuantity:
                    existingList[i].catigoryItemList[j].defaultUnitQuantity,
                  amount: existingList[i].catigoryItemList[j].amount,
                  price: existingList[i].catigoryItemList[j].price,
                },
              ],
            };
            const existingCatigoryIndex = updatedItemList.findIndex(
              (listItem) => listItem.catigory === updatedCartigoryItem.catigory
            );
            const exisitngCatigoryItem = updatedItemList[existingCatigoryIndex];

            let updatedItem = null;
            if (exisitngCatigoryItem) {
              updatedItem = {
                catigory: exisitngCatigoryItem.catigory,
                catigoryItemList: exisitngCatigoryItem.catigoryItemList.concat(
                  updatedCartigoryItem.catigoryItemList
                ),
              };
              updatedItemList[existingCatigoryIndex] = updatedItem;
            } else {
              updatedItem = updatedCartigoryItem;
              updatedItemList.push(updatedItem);
            }
          }
        }
      }
      state.totalCategories = state.itemList.length;
      state.itemList = updatedItemList;
      state.totalPrice = state.totalPrice - currentItemPrice;
    },
  },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
