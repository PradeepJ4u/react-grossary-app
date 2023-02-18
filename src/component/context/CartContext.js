import { createContext } from "react";

const CartContext = createContext({
  finalList:[],
  itemList: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;