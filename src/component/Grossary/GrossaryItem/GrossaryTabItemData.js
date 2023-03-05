import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import GrossaryItemForm from "./GrossaryItemForm";
import styles from "./GrossaryTabItemData.module.css";
import { getSystemDate } from "../../Util/UtilityMethod";

function GrossaryTabItemData(props) {
  const dispatch = useDispatch();
  const grossaryItem = props.item;

  const addToCartHandler = (enteredAmount) => {
    const newItem = {
      item: {
        catigory: props.itemCatigory,
        catigoryItemData: {
          itemId: grossaryItem.itemId,
          itemName: grossaryItem.itemName,
          defaultQuantity: +grossaryItem.defaultQuantity,
          defaultUnitQuantity: grossaryItem.defaultUnitQuantity,
          price: grossaryItem.price,
          amount: enteredAmount,
        },
      },
    };
    dispatch(cartActions.updateOrderDate(getSystemDate()))
    dispatch(cartActions.addItemToCart(newItem));
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
