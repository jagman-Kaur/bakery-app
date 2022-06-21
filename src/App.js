import { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import ProtectedRoute from "./routes/ProtectedRoute";
import BakeryList from "./components/bakery/BakeryList";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import HeaderMain from "./components/layout/main-page-header/HeaderMain";
import { Redirect } from "react-router-dom";

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
        <ProtectedRoute path="/menu">
          <Redirect to="/menu/all" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/all">
          <BakeryList category="all" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/muffins">
          <BakeryList category="muffins" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/pies">
          <BakeryList category="pies" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/doughnuts">
          <BakeryList category="doughnuts" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/bevy">
          <BakeryList category="bevy" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/bread">
          <BakeryList category="bread" />
        </ProtectedRoute>
        <ProtectedRoute path="/menu/cakes">
          <BakeryList category="cakes" />
        </ProtectedRoute>
      </main>
    </Fragment>
  );
}

export default App;
