import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import CartItem from "./CartItem";

function Cart(props) {
  const cntx = useContext(CartContext);
  const totalAmount = cntx.totalAmount.toFixed(2);
  const showOrderButton = cntx.itemList.length > 0;

  const addItemToCart = (item, itemCatigory) => {
    const formatedItem = {
      catigory: itemCatigory,
      catigoryItemData: {
        itemId: item.itemId,
        itemName: item.itemName,
        quantity:
        item.quantity,
        price: item.price,
        amount: +1,
      },
    };
    cntx.addItem(formatedItem);
  };
  const removeItemToCart = (itemId) => {
    cntx.removeItem(itemId);
  };
  const cartItem = (
    <ul className={styles["catigory-items"]}>
      {cntx.itemList.map((catigoryListItem) => {
        return (
          <div className={styles["catigory-item"]} key={catigoryListItem.catigory}>
            <h1>{catigoryListItem.catigory}</h1>
            {catigoryListItem.catigoryItemList.map((catigoryItem) => {
              return (
                <CartItem
                  key={catigoryItem.itemId}
                  item={catigoryItem}
                  itemCatigory={catigoryListItem.catigory}
                  onAddItem={addItemToCart.bind(null, catigoryItem)}
                  onRemoveItem={removeItemToCart.bind(
                    null,
                    catigoryItem.itemId
                  )}
                />
              );
            })}
          </div>
        );
      })}
    </ul>
  );
  return (
    <Modal hideCart={props.hideCart}>
      {cartItem}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>Rs. {totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        {showOrderButton && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}
export default Cart;
