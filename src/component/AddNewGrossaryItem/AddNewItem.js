import { useRef, useState } from "react";
import Button from "../UI/Button";
import styles from "./AddNewItem.module.css";

function AddNewItem(props) {
  const [isItemNameValid, setIsItemNameValid] = useState(true);
  const [isCatigoryValid, setIsCatigoryValid] = useState(true);
  const [isdefaultQuantityValid, setIsdefaultQuantityValid] = useState(true);
  const [isDefaultUnitQuantityValid, setisDefaultUnitQuantityValid] =
    useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newDataAdded, setNewDataAdded] = useState(false);

  const itemNameRef = useRef("");
  const catigoryRef = useRef("");
  const defaultQuantityRef = useRef(0);
  const defaultUnitQuantityRef = useRef("");
  const priceRef = useRef(0);

  async function submitHandler(event) {
    event.preventDefault();
    if (itemNameRef.current.value.trim().length === 0)
      setIsItemNameValid(false);
    if (catigoryRef.current.value.trim().length === 0)
      setIsCatigoryValid(false);
    if (
      defaultQuantityRef.current.value.trim().length === 0 ||
      defaultQuantityRef.current.value === 0
    )
      setIsdefaultQuantityValid(false);
    if (defaultUnitQuantityRef.current.value.trim().length === 0)
      setisDefaultUnitQuantityValid(false);
    if (
      priceRef.current.value.trim().length === 0 ||
      priceRef.current.value === 0
    )
      setIsPriceValid(false);

    const enteredValue = {
      itemId: Math.floor(Date.now() + Math.random()),
      itemName: itemNameRef.current.value,
      img: "",
      isBaseItem: true,
      catigory: catigoryRef.current.value,
      defaultQuantity: +defaultQuantityRef.current.value,
      defaultUnitQuantity: defaultUnitQuantityRef.current.value,
      price: +priceRef.current.value,
    };
    console.log(enteredValue);
    setLoading(true);
    try {
      const response = await fetch(
        "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app/BaseItems.json",
        {
          method: "POST",
          body: JSON.stringify(enteredValue),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setNewDataAdded(true);
      setLoading(false);
      props.onRefresh();
      itemNameRef.current.value = "";
      catigoryRef.current.value = "";
      defaultQuantityRef.current.value = 0;
      defaultUnitQuantityRef.current.value = "";
      priceRef.current.value = 0;
    } catch (err) {
      console.log(err);
    }
  }

  const onItemNameBlurHandler = () => {
    setNewDataAdded(false);
    if (itemNameRef.current.value === "") {
      setIsItemNameValid(false);
    } else {
      setIsItemNameValid(true);
    }
  };

  const onCatigoryBlurHandler = () => {
    setNewDataAdded(false);
    if (catigoryRef.current.value === "") {
      setIsCatigoryValid(false);
    } else {
      setIsCatigoryValid(true);
    }
  };
  const onDefaultQuantityBlurHandler = () => {
    setNewDataAdded(false);
    if (defaultQuantityRef.current.value === "") {
      setIsdefaultQuantityValid(false);
    } else {
      setIsdefaultQuantityValid(true);
    }
  };
  const onDefaultUnitQuantityBlurHandler = () => {
    setNewDataAdded(false);
    if (defaultUnitQuantityRef.current.value === "") {
      setisDefaultUnitQuantityValid(false);
    } else {
      setisDefaultUnitQuantityValid(true);
    }
  };
  const onPriceBlurHandler = () => {
    setNewDataAdded(false);
    if (priceRef.current.value === "") {
      setIsPriceValid(false);
    } else {
      setIsPriceValid(true);
    }
  };

  return (
    <>
      {loading && <p>Saving the data.</p>}
      {newDataAdded && <p>New Doc Added.</p>}
      {!loading && (
        <section className={styles.newItemForm}>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.control}>
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="item-name"
                ref={itemNameRef}
                onBlur={onItemNameBlurHandler}
              />
              <div>{!isItemNameValid && <p>Enter a valid Item Name.</p>}</div>
            </div>
            <div className={styles.control}>
              <label htmlFor="catigory">Catigory</label>
              <input
                type="text"
                id="catigory"
                ref={catigoryRef}
                onBlur={onCatigoryBlurHandler}
              />
              <div>{!isCatigoryValid && <p>Enter a valid Catigory.</p>}</div>
            </div>
            <div className={styles.control}>
              <label htmlFor="default-quantity">Default Quantity</label>
              <input
                type="number"
                id="default-quantity"
                ref={defaultQuantityRef}
                min="1"
                onBlur={onDefaultQuantityBlurHandler}
              ></input>
              <div>
                {!isdefaultQuantityValid && <p>Enter a valid Quantity.</p>}
              </div>
            </div>
            <div className={styles.control}>
              <label htmlFor="default-unit-quantity">
                Default Unit Quantity.
              </label>
              <input
                type="text"
                id="default-unit-quantity"
                ref={defaultUnitQuantityRef}
                onBlur={onDefaultUnitQuantityBlurHandler}
              />
              <div>
                {!isDefaultUnitQuantityValid && (
                  <p>Enter a valid Unit Quantity.</p>
                )}
              </div>
            </div>
            <div className={styles.control}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                ref={priceRef}
                min="1"
                onBlur={onPriceBlurHandler}
              />
              <div>{!isPriceValid && <p>Enter a valid Price.</p>}</div>
            </div>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={props.onHideForm}>
              Close
            </Button>
          </form>
        </section>
      )}
    </>
  );
}
export default AddNewItem;
