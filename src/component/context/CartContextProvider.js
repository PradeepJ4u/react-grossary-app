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

    //Add Item: updatimg CartList
    console.log(state);
    console.log(action);

    const existingCatigoryIndex = state.itemList.findIndex(
      (catigoryItem) => catigoryItem.catigory === action.item.catigory
    );
    const existingCatigoryItem = state.itemList[existingCatigoryIndex];

    let updatedItemList = [];
    if (existingCatigoryItem) {
      const existingItemIndex = state.itemList.findIndex(
        (catigoryItem) => catigoryItem.catigory === action.item.catigory
      );
      const existingCatigoryItem = state.itemList[existingCatigoryIndex];
    } else {
      const finalStateItemList = {
        catigory: action.item.catigory,
        catigoryItemList: [action.item.catigoryItemData],
      };
      updatedItemList = [finalStateItemList];
    }
    return {
      ...state,
      itemList: updatedItemList,
      totalAmount: updateTotalAmount,
    };
  }
  //Remove Item: updating reducer State:
  if (action.type === "REMOVE_ITEM") {
    const updatedCartItemIndex = state.itemList.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.itemList[updatedCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updateItemList;
    if (existingCartItem.amount === 1) {
      updateItemList = state.itemList.filter((item) => item.id !== action.id);
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItemList = [...state.itemList];
      updateItemList[updatedCartItemIndex] = updateItem;
    }
    return {
      ...state,
      itemList: updateItemList,
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

  const removeItemFormContext = (id) => {
    dispatchCartState({ type: "REMOVE_ITEM", id: id });
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
