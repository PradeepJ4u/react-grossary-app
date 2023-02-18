import { useState } from "react";
import Cart from "./component/Cart/Cart";
import CartContextProvider from "./component/context/CartContextProvider";
import GrossaryTab from "./component/Grossary/GrossaryTab";
import Header from "./component/Header/Header";

function App() {
  const [showCart, setShowCart] = useState(false);

  const hideCart = () => {
    setShowCart(false);
  };

  const handelCartClick = () => {
    setShowCart(true);
  };

  return (
    <CartContextProvider>
      {showCart && <Cart hideCart={hideCart} />}
      <Header cartClick={handelCartClick} />
      <GrossaryTab />
    </CartContextProvider>
  );
}

export default App;
