import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { FINAL_DATA_LIST } from '../Util/Constants'

function Cart(props) {
  // const cntx = useContext(CartContext);
  // console.log(cntx);

  const totalAmount = 39.62;
  // const showOrderButton = cntx.itemList.length > 0;
  const showOrderButton = false

  const addItemToCart = (item) => {
    // cntx.addItem({...item, amount:+1})
  };
  const removeItemToCart = (id) => {
    // cntx.removeItem(id)
  };
  const cartItem = (
    <ul className={styles["cart-items"]}>
      {FINAL_DATA_LIST.map((item) => {
        return (
          <CartItem
            key={item.itemId}
            name={item.itemName}
            price={item.price}
            amount={item.defaultQuantity}
            onAddItem={addItemToCart.bind(null, item)}
            onRemoveItem={removeItemToCart.bind(null, item.itemId)}
          />
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
