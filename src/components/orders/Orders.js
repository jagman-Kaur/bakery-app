import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
//import OrdersContext from "../../store/orders-context";
import Modal from "../UI/Modal";
import OrderList from "./OrderList";
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
      let userOrders = [];
      for (let key of keys) {
        let orderedItems = [];
        if (responseData[key].user.email === userEmail) {
          for (let i = 0; i < responseData[key].orderedItems.length; i++) {
            orderedItems.push(responseData[key].orderedItems[i]);
          }

          userOrders.push({ date: responseData[key].date, orderedItems });
        }
      }
      setItems(userOrders);
    }
    loadOrders().catch((error) => {
      setError(error.message);
    });
  }, [userEmail]);

  const submittingContent = <p>Loading...</p>;
  const errorContent = <div className={classes.error}>{error}</div>;
  const noOrdersContent = <p>No orders yet</p>;

  console.log(items.length);

  return (
    <Modal hideModal={props.hideOrders}>
      {isSubmitting && submittingContent}
      {error && errorContent}
      {!isSubmitting && items.length === 0 && !error && noOrdersContent}
      {!isSubmitting && items.length > 0 && !error && (
        <Fragment>
          {items.map((item) => (
            <OrderList date={item.date} orderedItems={item.orderedItems} />
          ))}
        </Fragment>
      )}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideOrders}>
          Close
        </button>
      </div>
    </Modal>
  );
}

export default Orders;
