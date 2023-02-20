import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../context/CartContext";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const cntx = useContext(CartContext);
  const [bumpCartButtom, setBumpCartButton] = useState(false);

  const itemListArray = cntx.itemList;

  let totalItemList = [];

  for (let i = 0; i < itemListArray.length; i++) {
    for (let j = 0; j < itemListArray[i].catigoryItemList.length; j++) {
      totalItemList.push(itemListArray[i].catigoryItemList[j]);
    }
  }
  const numberOfCartItem = totalItemList.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const buttonClasses = `${styles.button} ${bumpCartButtom ? styles.bump : ""}`;

  useEffect(() => {
    setBumpCartButton(true);
    const timer = setTimeout(() => {
      setBumpCartButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemListArray]);

  return (
    <button className={buttonClasses} onClick={props.cartClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
}
export default HeaderCartButton;
