import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { useState } from "react";
import CartItem from "./CartItem";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  usePDF,
  View,
} from "@react-pdf/renderer";
import { getSystemDate } from "../Util/UtilityMethod";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const docStyles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  catigory: {
    margin: 10,
    padding: 8,
    fontSize: 12,
    fontWeight: "bold",
  },
  header: {
    margin: 10,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: 10,
  },
  date: {
    textAlign: "left",
  },
  itemNumber: {
    textAlign: "right",
  },
  section: {
    paddingBottom: 10,
    borderBottom: "1px solid #8a2b06",
  },
  text: {
    // margin: 18,
    marginLeft: "50px",
    fontSize: 10,
    textAlign: "justify",
  },
  catigoryDatils: {
    flexDirection: "row",
    fontSize: 10,
    textAlign: "justify",
  },
  catigoryName: {
    marginLeft: "50px",
    fontSize: 10,
    textAlign: "justify",
    width: "100px",
  },
});
function Cart(props) {
  const totalAmount = useSelector((state) => state.cart.totalPrice);
  const itemList = useSelector((state) => state.cart.itemList);
  const showOrderButton = itemList.length > 0;
  const dispatch = useDispatch();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const displayDate = getSystemDate();

  const addItemToCart = (item, itemCatigory) => {
    const formatedItem = {
      item: {
        catigory: itemCatigory,
        catigoryItemData: {
          itemId: item.itemId,
          itemName: item.itemName,
          defaultQuantity: item.defaultQuantity,
          defaultUnitQuantity: item.defaultUnitQuantity,
          price: +item.price,
          amount: +1,
        },
      },
    };
    dispatch(cartActions.addItemToCart(formatedItem));
  };
  console.log(itemList);
  const removeItemToCart = (itemId) => {
    dispatch(cartActions.removeItemFromCart(itemId));
  };
  const cartItem = (
    <ul className={styles["catigory-items"]}>
      {itemList.map((catigoryListItem) => {
        return (
          <div
            className={styles["catigory-item"]}
            key={catigoryListItem.catigory}
          >
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
  console.log(itemList);
  let itemCount = 0;
  for (let i = 0; i < itemList.length; i++) {
    itemCount = itemCount + itemList[i].catigoryItemList.length;
  }
  console.log(itemCount);
  const pdfDoc = (
    <Document>
      <Page size="A4" style={docStyles.page}>
        <View style={docStyles.header}>
          <Text style={docStyles.date}>Date: {displayDate}</Text>
          <Text style={docStyles.itemNumber}> No. of Items: {itemCount} </Text>
        </View>
        {itemList.map((catigoryListItem) => {
          return (
            <View style={docStyles.section} key={catigoryListItem.catigory}>
              <Text style={docStyles.catigory}>
                {catigoryListItem.catigory}
              </Text>
              {catigoryListItem.catigoryItemList.map((catigoryItem) => {
                return (
                  <View
                    style={docStyles.catigoryDatils}
                    key={catigoryItem.itemId}
                  >
                    <Text style={docStyles.catigoryName}>
                      {catigoryItem.itemName}{" "}
                    </Text>
                    <Text style={docStyles.text}>
                      {+catigoryItem.defaultQuantity * +catigoryItem.amount}{" "}
                      {catigoryItem.defaultUnitQuantity}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Page>
    </Document>
  );

  const handleOrderButton = () => {
    setIsOrderConfirmed(true);
    console.log(pdfDoc);
  };

  const [instance, updateInstance] = usePDF({ document: pdfDoc });
  if (false) updateInstance(null);
  if (isOrderConfirmed) {
    if (instance.loading) return <div>Loading ...</div>;

    if (instance.error) return <div>Something went wrong:</div>;
  }

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
        {showOrderButton && !isOrderConfirmed && (
          <button className={styles.button} onClick={handleOrderButton}>
            Finish
          </button>
        )}
        {showOrderButton && isOrderConfirmed && (
          <a className={styles.button} href={instance.url} download="test.pdf">
            Download
          </a>
        )}
      </div>
    </Modal>
  );
}
export default Cart;
