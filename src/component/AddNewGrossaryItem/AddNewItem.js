import { useRef, useState } from "react";
import styles from "./AddNewItem.module.css";

function AddNewItem(props) {
  const [isItemNameValid, setIsItemNameValid] = useState(true);
  const [isCatigoryValid, setIsCatigoryValid] = useState(true);
  const [isdefaultQuantityValid, setIsdefaultQuantityValid] = useState(true);
  const [isDefaultUnitQuantityValid, setisDefaultUnitQuantityValid] =
    useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const itemNameRef = useRef("");
  const catigoryRef = useRef("");
  const defaultQuantityRef = useRef(0);
  const defaultUnitQuantityRef = useRef("");
  const priceRef = useRef(0);

  const submitHandler = (event) => {
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

      const enteredValue =  {
        catigory: catigoryRef.current.value,
        itemList: [{        itemName: itemNameRef.current.value,
        img: "",
        isBaseItem: true,
        defaultQuantity: defaultQuantityRef.current.value,
        defaultUnitQuantity: defaultUnitQuantityRef.current.value,
        price: priceRef.current.value
      }
    ]
}
    props.onAddGoal(enteredValue);
  };

  const onBlurHandler = () => {
    console.log("Was here");
    if (itemNameRef.current.value === "") {
      setIsItemNameValid(false);
    } else {
      setIsItemNameValid(true);
    }
    if (defaultQuantityRef.current.value === "") {
      setIsdefaultQuantityValid(false);
    } else {
      setIsdefaultQuantityValid(true);
    }
    if (defaultUnitQuantityRef.current.value === "") {
      setisDefaultUnitQuantityValid(false);
    } else {
      setisDefaultUnitQuantityValid(true);
    }
    if (priceRef.current.value === "") {
      setIsPriceValid(false);
    } else {
      setIsPriceValid(true);
    }
  };

  return (
    <section className={styles.newItemForm}>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="item-name"
            ref={itemNameRef}
            onBlur={onBlurHandler}
          />
          {!isItemNameValid && <p>Enter a valid Item Name.</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor="catigory">Catigory</label>
          <input
            type="text"
            id="catigory"
            ref={catigoryRef}
            onBlur={onBlurHandler}
          />
          {!isCatigoryValid && <p>Enter a valid Catigory.</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor="default-quantity">Default Quantity</label>
          <input
            type="number"
            id="default-quantity"
            ref={defaultQuantityRef}
            min="1"
            onBlur={onBlurHandler}
          ></input>
          {!isdefaultQuantityValid && <p>Enter a valid Quantity.</p>}
        </div>

        <div className={styles.control}>
          <label htmlFor="default-unit-quantity">Default Unit Quantity.</label>
          <input
            type="text"
            id="default-unit-quantity"
            ref={defaultUnitQuantityRef}
            onBlur={onBlurHandler}
          />
          {!isDefaultUnitQuantityValid && <p>Enter a valid Unit Quantity.</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            ref={priceRef}
            min="1"
            onBlur={onBlurHandler}
          />
          {!isPriceValid && <p>Enter a valid Price.</p>}
        </div>
        <button>Save</button>
      </form>
    </section>
  );
}
export default AddNewItem;
