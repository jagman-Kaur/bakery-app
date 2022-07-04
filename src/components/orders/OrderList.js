import OrderItem from "./OrderItem";
import classes from "./OrderList.module.css";

function OrderList(props) {
  let date = new Date(props.date);
  let newDate =
    date.getDate() +
    "-" +
    date.getMonth() +
    "-" +
    date.getFullYear() +
    " @ " +
    date.toLocaleTimeString();

  return (
    <ul className={classes["order-list"]}>
      <h2>Order placed on {newDate}</h2>
      {props.orderedItems.map((item) => (
        <OrderItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
        />
      ))}
    </ul>
  );
}

export default OrderList;
