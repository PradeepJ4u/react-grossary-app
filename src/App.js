import { useDispatch, useSelector } from "react-redux";
import Cart from "./component/Cart/Cart";
import GrossaryTab from "./component/Grossary/GrossaryTab";
import Header from "./component/Header/Header";
import { uiAction } from "./store/ui";

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.showCart)

  const hideCart = () => {
    dispatch(uiAction.hideCart())
  };

  const handelCartClick = () => {
    dispatch(uiAction.showCart())
  };

  return (
    <>
      {showCart && <Cart hideCart={hideCart} />}
      <Header cartClick={handelCartClick} />
      <GrossaryTab />
    </>
  );
}

export default App;
