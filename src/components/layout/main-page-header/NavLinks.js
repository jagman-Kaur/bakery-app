import React from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import "./NavLinks.css";

function NavLinks(props) {
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
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <Link to="/auth">Login/Signup</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={props.showOrders}>Your orders</button>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavLinks;
