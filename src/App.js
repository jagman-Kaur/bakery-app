import { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import BakeryList from "./components/bakery/BakeryList";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import HeaderMain from "./components/layout/main-page-header/HeaderMain";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [ordersShown, setOrdersShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }
  function hideCartHandler() {
    setCartIsShown(false);
  }
  function showOrdersHandler() {
    setOrdersShown(true);
  }
  function hideOrdersHandler() {
    setOrdersShown(false);
  }

  return (
    <Fragment>
      {cartIsShown && <Cart hideCart={hideCartHandler} />}
      {ordersShown && <Orders hideOrders={hideOrdersHandler} />}
      <HeaderMain showCart={showCartHandler} showOrders={showOrdersHandler} />
      <main>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/menu/all">
          <BakeryList category="all" />
        </Route>
        <Route path="/menu/muffins">
          <BakeryList category="muffins" />
        </Route>
        <Route path="/menu/pies">
          <BakeryList category="pies" />
        </Route>
        <Route path="/menu/doughnuts">
          <BakeryList category="doughnuts" />
        </Route>
        <Route path="/menu/bevy">
          <BakeryList category="bevy" />
        </Route>
        <Route path="/menu/bread">
          <BakeryList category="bread" />
        </Route>
        <Route path="/menu/cakes">
          <BakeryList category="cakes" />
        </Route>
      </main>
    </Fragment>
  );
}

export default App;
