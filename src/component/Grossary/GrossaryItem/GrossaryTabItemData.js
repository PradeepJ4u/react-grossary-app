import { useContext } from "react";
import CartContext from "../../context/CartContext";
import GrossaryItemForm from "./GrossaryItemForm";
import styles from "./GrossaryTabItemData.module.css";

function GrossaryTabItemData(props) {
  const cntx = useContext(CartContext);
  const grossaryItem = props.item;

  const addToCartHandler = (enteredAmount) => {
    cntx.addItem({
      catigory: props.itemCatigory,
      catigoryItemData: {
        itemId: grossaryItem.itemId,
        itemName: grossaryItem.itemName,
        quantity:
          grossaryItem.defaultQuantity + " " + grossaryItem.defaultUnitQuantity,
        price: grossaryItem.price,
        amount: enteredAmount,
      },
    });
  };

  return (
    <li key={props.item.id} className={styles["available-list-item"]}>
      <h3>{props.item.itemName}</h3>
      <div className={styles.description}>
        {props.item.defaultQuantity} {props.item.defaultUnitQuantity}
      </div>
      <div className={styles.price}>Rs. {props.item.price}/-</div>
      <GrossaryItemForm id={props.item.id} onAddToCart={addToCartHandler} />
    </li>
  );
}
export default GrossaryTabItemData;
