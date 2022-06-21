import { NavLink } from "react-router-dom";
import classes from "./MenuHeader.module.css";
function MenuHeader() {
  return (
    <header className={classes.header}>
      <h2>Menu</h2>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/all">
              All
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/pies">
              Pies
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/muffins">
              Muffins
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/doughnuts">
              Donuts
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/bread">
              Bread
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/cakes">
              Cakes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/menu/bevy">
              Beverages
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MenuHeader;
