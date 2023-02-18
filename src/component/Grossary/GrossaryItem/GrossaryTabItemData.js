import GrossaryItemForm from "./GrossaryItemForm";
import styles from "./GrossaryTabItemData.module.css";

function GrossaryTabItemData(props) {
  // const cntx = useContext(CartContext);
  const addToCartHandler = (enteredAmount) => {
    // cntx.addItem({
    //   id: currentTabDataList.id,
    //   name: mealItem.name,
    //   price: mealItem.price,
    //   amount: enteredAmount,
    // });
    // console.log({
    //   id: mealItem.id,
    //   name: mealItem.name,
    //   price: mealItem.price,
    //   amount: enteredAmount,
    // });
  };

  return (
    <li className={styles["available-list-item"]} key={props.item.itemId}>
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