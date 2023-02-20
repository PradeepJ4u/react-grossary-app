import { useReducer } from "react";
import { FINAL_DATA_LIST } from "../Util/Constants";
import CartContext from "./CartContext";

const defaultCartState = {
  finalItemList: [],
  itemList: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  //Add Item: updating reducer State:
  if (action.type === "ADD_ITEM") {
    //Add Item: updating total Price
    const updateTotalAmount =
      state.totalAmount +
      action.item.catigoryItemData.price * action.item.catigoryItemData.amount;

    //Add Item: updating CartList

    const existingCatigoryIndex = state.itemList.findIndex(
      (catigoryItem) => catigoryItem.catigory === action.item.catigory
    );
    const existingCatigoryItem = state.itemList[existingCatigoryIndex];
    let updatedItemList = [];
    if (existingCatigoryItem) {
      //catiogory found
      const existingItemIndex = existingCatigoryItem.catigoryItemList.findIndex(
        (catigoryItem) =>
          catigoryItem.itemId === action.item.catigoryItemData.itemId
      );
      const existingItemData =
        existingCatigoryItem.catigoryItemList[existingItemIndex];
      if (existingItemData) {
        //existing item found
        const updatedItemData = {
          ...existingItemData,
          amount: existingItemData.amount + action.item.catigoryItemData.amount,
        };
        existingCatigoryItem.catigoryItemList[existingItemIndex] =
          updatedItemData;

        updatedItemList = state.itemList;
      } else {
        //existing item not found
        const currentItemList = existingCatigoryItem.catigoryItemList;
        const finalStateItemList = {
          catigory: action.item.catigory,
          catigoryItemList: [...currentItemList, action.item.catigoryItemData],
        };
        state.itemList[existingCatigoryIndex] = finalStateItemList
        updatedItemList = state.itemList
      }
    } else {
      //catigory not found
      const finalStateItemList = {
        catigory: action.item.catigory,
        catigoryItemList: [action.item.catigoryItemData],
      };
      updatedItemList = [...state.itemList, finalStateItemList];
    }
    return {
      ...state,
      itemList: updatedItemList,
      totalAmount: updateTotalAmount,
    };
  }
  //Remove Item: updating reducer State:
  if (action.type === "REMOVE_ITEM") {
    let updatedItemList = [];
    let currentItemPrice = 0;

    const existingList = state.itemList;
    for (let i = 0; i < existingList.length; i++) {
      for (let j = 0; j < existingList[i].catigoryItemList.length; j++) {
        let updatedCartigoryItem = null;
        if (existingList[i].catigoryItemList[j].itemId === action.itemId) {
          currentItemPrice = existingList[i].catigoryItemList[j].price;
          if (existingList[i].catigoryItemList[j].amount > 1) {
            updatedCartigoryItem = {
              catigory: existingList[i].catigory,
              catigoryItemList: [
                {
                  itemId: existingList[i].catigoryItemList[j].itemId,
                  itemName: existingList[i].catigoryItemList[j].itemName,
                  quantity: existingList[i].catigoryItemList[j].quantity,
                  amount: existingList[i].catigoryItemList[j].amount - 1,
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
              updatedItemList[existingCatigoryIndex] = updatedItem
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
                quantity: existingList[i].catigoryItemList[j].quantity,
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
    const updatedTotalAmount = state.totalAmount - currentItemPrice;
    return {
      ...state,
      itemList: updatedItemList,
      totalAmount: updatedTotalAmount,
    };
  }

  //Final List: updating reducer State:
  if (action.type === "UPDATE_FINAL_LIST") {
    return { ...state, finalItemList: action.finalItemList };
  }
  return defaultCartState;
};

//CartContextProvider login
const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  if (cartState.finalItemList.length === 0) {
    dispatchCartState({
      type: "UPDATE_FINAL_LIST",
      finalItemList: FINAL_DATA_LIST,
    });
  }

  const addItemToContext = (item) => {
    dispatchCartState({ type: "ADD_ITEM", item: item });
  };

  const removeItemFormContext = (itemId) => {
    dispatchCartState({ type: "REMOVE_ITEM", itemId: itemId });
  };

  const cartContext = {
    finalItemList: cartState.finalItemList,
    itemList: cartState.itemList,
    totalAmount: cartState.totalAmount,
    addItem: addItemToContext,
    removeItem: removeItemFormContext,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
