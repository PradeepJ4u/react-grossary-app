import useDatabase from "../hooks/usedatabase";
import useInput from "../hooks/useInput";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AddNewItem.module.css";

function AddNewItem(props) {
  //itemNameClass
  const {
    value: enteredItemName,
    hasError: enteredItemNameIsValid,
    reset: itemNameReset,
    enteredValueHandller: inputItemNameHandller,
    enteredValueBlurrHandller: inputItemBlurrHandller,
  } = useInput((value) => {
    return value.trim() === "";
  });
  const itemNameClass = enteredItemNameIsValid
    ? styles.invalid
    : styles.control;
  //enteredCatigory
  const {
    value: enteredCatigory,
    hasError: enteredIsCatigoryValid,
    reset: catigoryReset,
    enteredValueHandller: inputCatigoryHandller,
    enteredValueBlurrHandller: inputCatigoryBlurrHandller,
  } = useInput((value) => {
    return value.trim() === "";
  });
  const catigoryNameClass = enteredIsCatigoryValid
    ? styles.invalid
    : styles.control;
  //Default Quantity
  const {
    value: enteredDefaultQuantity,
    hasError: enteredIsDefaultQuantityValid,
    reset: defaultQuantityReset,
    enteredValueHandller: inputDefaultQuantityHandller,
    enteredValueBlurrHandller: inputDefaultQuantityBlurrHandller,
  } = useInput((value) => {
    return value.trim() === "" || value.trim() === 0;
  });
  const defaultQuantityClass = enteredIsDefaultQuantityValid
    ? styles.invalid
    : styles.control;

  //Default Unit Quantity
  const {
    value: enteredDefaultUnitQuantity,
    hasError: enteredIsDefaultUnitQuantityValid,
    reset: defaultUnitQuantityReset,
    enteredValueHandller: inputDefaultUnitQuantityHandller,
    enteredValueBlurrHandller: inputDefaultUnitQuantityBlurrHandller,
  } = useInput((value) => {
    return value.trim() === "";
  });
  const defaultDefaultUnitQuantityClass = enteredIsDefaultUnitQuantityValid
    ? styles.invalid
    : styles.control;

  //Price
  const {
    value: enteredPrice,
    hasError: enteredIsPriceValid,
    reset: priceReset,
    enteredValueHandller: inputPriceHandller,
    enteredValueBlurrHandller: inputPriceBlurrHandller,
  } = useInput((value) => {
    return value.trim() === "" || value.trim() === 0;
  });
  const priceClass = enteredIsPriceValid ? styles.invalid : styles.control;

  let isFormInvalid = false;
  if (
    enteredItemName.trim() !== "" &&
    enteredCatigory.trim() !== "" &&
    enteredDefaultUnitQuantity !== 0 &&
    enteredDefaultUnitQuantity.trim() !== "" &&
    enteredPrice !== 0
  ) {
    isFormInvalid = true;
  }
  //saving data logic
  const { isLoading, error, fetchTasks: setNewDataAdded } = useDatabase();
  console.log(error);
  let newDataAdded = null;
  async function submitHandler(event) {
    event.preventDefault();
    inputItemBlurrHandller()
    inputCatigoryBlurrHandller()
    inputDefaultQuantityBlurrHandller()
    inputDefaultUnitQuantityBlurrHandller()
    inputPriceBlurrHandller()

    if (!isFormInvalid) {
      return;
    }
    const enteredValue = {
      itemId: Math.floor(Date.now() + Math.random()),
      itemName: enteredItemName,
      img: "",
      isBaseItem: true,
      catigory: enteredCatigory,
      defaultQuantity: +enteredDefaultQuantity,
      defaultUnitQuantity: enteredDefaultUnitQuantity,
      price: +enteredPrice,
    };
    console.log(enteredValue);
    const loadedTask = (data) => {
      console.log(data);
      console.log(enteredValue);
      newDataAdded = data;
      props.onAddTask(enteredValue);
    };
    setNewDataAdded(
      {
        url: "https://grossary-app-28792-default-rtdb.asia-southeast1.firebasedatabase.app/BaseItems.json",
        method: "POST",
        body: enteredValue,
        headers: {
          "Content-Type": "application/json",
        },
      },
      loadedTask
    );

    setNewDataAdded(true);
    itemNameReset();
    catigoryReset();
    defaultQuantityReset();
    defaultUnitQuantityReset();
    priceReset();
  }

  return (
    <Card className={styles.addItemWrapper}>
      {isLoading && <p>Saving the data.</p>}
      {newDataAdded && <p>New Doc Added.</p>}
      {!isLoading && (
        <section className={styles.newItemForm}>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={`${styles.control} ${itemNameClass}`}>
              <label htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="item-name"
                value={enteredItemName}
                onChange={inputItemNameHandller}
                onBlur={inputItemBlurrHandller}
              />
              {enteredItemNameIsValid && <p>Enter a valid Item Name.</p>}
            </div>
            <div className={`${styles.control} ${catigoryNameClass}`}>
              <label htmlFor="catigory">Catigory</label>
              <input
                type="text"
                id="catigory"
                value={enteredCatigory}
                onChange={inputCatigoryHandller}
                onBlur={inputCatigoryBlurrHandller}
              />
              <div>
                {enteredIsCatigoryValid && <p>Enter a valid Catigory.</p>}
              </div>
            </div>
            <div className={`${styles.control} ${defaultQuantityClass}`}>
              <label htmlFor="default-quantity">Default Quantity</label>
              <input
                type="number"
                id="default-quantity"
                value={enteredDefaultQuantity}
                onChange={inputDefaultQuantityHandller}
                onBlur={inputDefaultQuantityBlurrHandller}
                min="1"
              ></input>
              <div>
                {enteredIsDefaultQuantityValid && (
                  <p>Enter a valid Quantity.</p>
                )}
              </div>
            </div>
            <div
              className={`${styles.control} ${defaultDefaultUnitQuantityClass}`}
            >
              <label htmlFor="default-unit-quantity">
                Default Unit Quantity.
              </label>
              <input
                type="text"
                id="default-unit-quantity"
                value={enteredDefaultUnitQuantity}
                onChange={inputDefaultUnitQuantityHandller}
                onBlur={inputDefaultUnitQuantityBlurrHandller}
              />
              <div>
                {enteredIsDefaultUnitQuantityValid && (
                  <p>Enter a valid Unit Quantity.</p>
                )}
              </div>
            </div>
            <div className={`${styles.control} ${priceClass}`}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={enteredPrice}
                onChange={inputPriceHandller}
                onBlur={inputPriceBlurrHandller}
                min="1"
              />
              <div>{enteredIsPriceValid && <p>Enter a valid Price.</p>}</div>
            </div>
            <div className={`${styles.control} ${priceClass}`}>
              <Button type="submit" disabled={!isFormInvalid}>
                Save
              </Button>
              <Button type="button" onClick={props.onHideForm}>
                Close
              </Button>
            </div>
          </form>
        </section>
      )}
    </Card>
  );
}
export default AddNewItem;
