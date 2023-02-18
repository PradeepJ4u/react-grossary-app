import styles from "./Header.module.css";
import supermarkt from "../../assets/supermarkt.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { CNTX_USER } from "../Util/Constants";

function Header(props) {
  const user = CNTX_USER
  return (
    <>
      <header className={styles.header}>
        <h3>Welcome {user.userFirstName}, Choose your grossary list</h3>
        <HeaderCartButton cartClick={props.cartClick}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={supermarkt} alt="Grossary List for the day"/>
      </div>
    </>
  );
}
export default Header;