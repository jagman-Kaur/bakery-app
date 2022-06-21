import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
//import OrdersContext from "../../store/orders-context";
import Modal from "../UI/Modal";
import OrderItem from "./OrderItem";
import classes from "./Orders.module.css";

function Orders(props) {
  const userEmail = useContext(AuthContext).userEmail;
  const [items, setItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadOrders() {
      const response = await fetch(
        "https://bakery-app-5f5c2-default-rtdb.firebaseio.com/orders.json"
      );

      setIsSubmitting(false);
      if (!response.ok) {
        console.log("error");
        throw new Error("Unable to load data");
      }

      const responseData = await response.json();
      let keys = Object.keys(responseData);
      console.log(userEmail);
      let orderedItems = [];
      for (let key of keys) {
        if (responseData[key].user.email === userEmail) {
          for (let i in responseData[key].orderedItems)
            orderedItems.push(responseData[key].orderedItems[i]);
        }
      }
      setItems(orderedItems);
    }
    loadOrders().catch(error => {
      setError(error.message)
    });
  }, [userEmail]);

  const submittingContent = <p>Loading...</p>;
  const errorContent = <div className={classes.error}>{error}</div>;
  const noOrdersContent = <p>No orders yet</p>;

  return (
    <Modal hideModal={props.hideOrders}>
      {isSubmitting && submittingContent}
      {error && errorContent}
      {!isSubmitting && items.length === 0 && !error && noOrdersContent}
      {!isSubmitting && items.length > 0 && !error && (
        <Fragment>
          <ul>
            {items.map((item) => (
              <OrderItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
              />
            ))}
          </ul>
          </Fragment>)}
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.hideOrders}>
              Close
            </button>
          </div>
    </Modal>
  );
}

export default Orders;
