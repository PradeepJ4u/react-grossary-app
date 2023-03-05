import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const itemList = useSelector(state => state.cart.itemList)
  const [bumpCartButtom, setBumpCartButton] = useState(false);
  let totalItemList = [];

  for (let i = 0; i < itemList.length; i++) {
    for (let j = 0; j < itemList[i].catigoryItemList.length; j++) {
      totalItemList.push(itemList[i].catigoryItemList[j]);
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
  }, [itemList]);

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
