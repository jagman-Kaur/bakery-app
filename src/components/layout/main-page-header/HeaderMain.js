import { Fragment, useContext, useState } from "react";

import { Link } from "react-router-dom";
import menuIcon from "../../../assets/menu-icon.png";
import AuthContext from "../../../store/auth-context";

import classes from "./HeaderMain.module.css";

import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import HeaderCartButton from "../cart-header/HeaderCartButton";
import Backdrop from "../../UI/Backdrop";

function HeaderMain(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const isLoggedIn = useContext(AuthContext).isLoggedIn;

  function opendrawerHandler() {
    setDrawerIsOpen(true);
  }

  function closeDrawerHandler(){
    setDrawerIsOpen(false)
  }

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>J's Bakery</div>
        </Link>
        <div className={classes.cart}>
          {isLoggedIn && <HeaderCartButton showCart={props.showCart} />}
        </div>
        <div className={classes.headerMain}>
          <NavLinks showOrders={props.showOrders} showCart={props.showCart} />
        </div>
        <div className={classes.headerDrawer}>
          <img src={menuIcon} alt="menu" onClick={opendrawerHandler} />
          {drawerIsOpen && (
            <SideDrawer onClick={closeDrawerHandler}>
              <NavLinks
                showOrders={props.showOrders}
                showCart={props.showCart}
              />
            </SideDrawer>
          )}
        </div>
      </header>
    </Fragment>
  );
}

export default HeaderMain;
