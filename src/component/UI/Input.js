import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props,ref) => {
  return <div className={styles.input}>
    <label htmlFor="props.id">{props.label}</label>
    <div>
        <input ref={ref} {...props.input} />
    </div>
  </div>;
}
)
export default Input;