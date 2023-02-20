import styles from './CartItem.module.css';

const CartItem = (props) => {
  const item = props.item
  const price = `Rs ${item.price.toFixed(2)}`;
  return (
    <li key={item.itemId} className={styles['cart-item']}>
      <div>
        <h3>{item.itemName}</h3>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemoveItem}>−</button>
        <button onClick={(itemCatigory) => props.onAddItem(props.itemCatigory)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;