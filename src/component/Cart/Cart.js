import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart(props) {
  const cntx = useContext(CartContext);
  console.log(cntx);

  const totalAmount = cntx.totalAmount;
  const showOrderButton = cntx.itemList.length > 0;

  const addItemToCart = (item) => {
    // cntx.addItem({...item, amount:+1})
  };
  const removeItemToCart = (id) => {
    // cntx.removeItem(id)
  };
  const cartItem = (
    <ul className={styles["cart-items"]}>
      {cntx.itemList.map((catigoryItem) => {
        return (
          <div key={catigoryItem}>
            <h1>{catigoryItem.catigory}</h1>
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
        <span>{totalAmount}</span>
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
