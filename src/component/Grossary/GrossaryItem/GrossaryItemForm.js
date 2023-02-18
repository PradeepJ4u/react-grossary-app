import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./GrossaryItemForm.module.css";

function GrossaryItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef();

  const handelSubmit = (state) => {
    state.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setAmountIsValid(false)
      return;
    }
    props.onAddToCart(+enteredAmount)
  };
  return (
    <form className={styles.form} onSubmit={handelSubmit}>
      <Input
        id={props.id}
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: 1,
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
}
export default GrossaryItemForm;
