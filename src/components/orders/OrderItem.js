import classes from './OrderItem.module.css'

function OrderItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['order-item']}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
