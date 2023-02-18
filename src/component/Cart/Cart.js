import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart(props) {
  const cntx = useContext(CartContext);
  //itemList [{itemId: 1, itemName: 'Mong Daal', quantity: '500 grms', price: 100, amount: 2}]

  const totalAmount = cntx.totalAmount.toFixed(2);
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
          <div key={catigoryItem.catigory}>
            {console.log(catigoryItem.catigory)}
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
