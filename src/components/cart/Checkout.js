import classes from "./Checkout.module.css";
import { useRef, useState, useContext } from "react";

import AuthContext from "../../store/auth-context";

function Checkout(props) {

  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();
  const stateInputRef = useRef();

  const userEmail = useContext(AuthContext).userEmail

  const [formValidity, setFormValidity] = useState({
    street: true,
    city: true,
    postal: true,
    state: true,
  });

  const isEmpty = (val) => val.trim() === "";
  const notFourChars = (val) => val.trim().length !== 4;

  function confirmHandler(event) {
    event.preventDefault();

    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredState = stateInputRef.current.value;

    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !notFourChars(enteredPostalCode);
    const enteredStateIsValid = !isEmpty(enteredState);

    setFormValidity({
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalCodeIsValid,
      state: enteredStateIsValid,
    });

    const formIsValid =
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredStateIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      email: userEmail,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostalCode,
      state: enteredState
    })
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
     <p>Enter your delivery address</p>
      <div className={`${classes.control} ${
          formValidity.street ? "" : classes.invalid
        }`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${
          formValidity.city ? "" : classes.invalid
        }`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={`${classes.control} ${
          formValidity.postal ? "" : classes.invalid
        }`}>
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${
          formValidity.state ? "" : classes.invalid
        }`}>
        <label htmlFor="state">State</label>
        <select id="state" ref={stateInputRef}>
          <option value="NSW">NSW</option>
          <option value="ACT">ACT</option>
          <option value="VIC">VIC</option>
          <option value="QLD">QLD</option>
          <option value="SA">SA</option>
          <option value="WA">WA</option>
          <option value="TAS">TAS</option>
        </select>
        {!formValidity.state && <p>Please enter a valid state</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.hideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
