import { Fragment, useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../../store/auth-context";
import classes from "./HeaderMain.module.css";
import HeaderCartButton from "../cart-header/HeaderCartButton";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

function HeaderMain(props) {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;
  const logout = useContext(AuthContext).logout;

  const history = useHistory();
  const dispatch = useDispatch();
  function logoutHandler() {
    logout();
    dispatch(cartActions.clearCart());
    history.replace("/auth");
  }

  return (
    <Fragment>
      <header className={classes.header}>
          <Link to="/">
            <div className={classes.logo}>J's Bakery</div>
          </Link>
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/auth">Login/Signup</Link>
              </li>
            )}
            {isLoggedIn && (
              <button onClick={props.showOrders}>Your orders</button>
            )}
            {isLoggedIn && <HeaderCartButton showCart={props.showCart} />}

            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
}

export default HeaderMain;
