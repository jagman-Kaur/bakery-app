import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
//import CartContext from "../../store/cart-context";
import { Fragment, useContext, useState } from "react";
import { cartActions } from "../../store/cart-slice";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import {useSelector, useDispatch} from 'react-redux'
import OrdersContext from "../../store/orders-context";

function Cart(props) {
  //const cartCtx = useContext(CartContext);
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const totalAmt = useSelector(state => state.totalAmount)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const hasItems = items.length > 0;

  const orderCtx = useContext(OrdersContext)

  function cartItemRemoveHandler(id) {
    dispatch(cartActions.removeItem(id));
  }
  function cartItemAddhandler(item) {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  }
  function orderHandler() {
    setIsCheckout(true);
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={+item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddhandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const totalAmount = `$${totalAmt.toFixed(2)}`;

  async function submitHandler(userData) {
    setIsSubmitting(true);
    await fetch(
      "https://bakery-app-5f5c2-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          date: new Date(),
          user: {...userData, email:userData.email},
          orderedItems: items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart())
    orderCtx.addOrder({...items, email:userData.email})
    
  }

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitHandler} hideCart={props.hideCart} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["btn--alt"]} onClick={props.hideCart}>
            Close
          </button>
          {hasItems && (
            <button onClick={orderHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  const submittingModalContent = <p>Sending Order Data...</p>;
  const submittedModalContent = (
    <Fragment>
      <p>Order sent!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.hideCart}>Close</button>
      </div>
    </Fragment>
  );

  return (
    <Modal hideModal={props.hideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && submittedModalContent}
    </Modal>
  );
}
export default Cart;
