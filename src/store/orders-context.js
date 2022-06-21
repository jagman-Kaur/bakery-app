import React, { useState } from "react";

const OrdersContext = React.createContext({
  orderItems: [],
  addOrder: (orderData) => {},
});

export function AuthContextProvider(props) {
  const [orderItems, setOrderItems] = useState([]);

  let updatedOrderList = []

  function addOrderHandler(orderData) {
      updatedOrderList = orderItems
      updatedOrderList = updatedOrderList.push(orderData)

      setOrderItems(updatedOrderList)
      
    setOrderItems(orderData);
  }

  const contextValue = {
    orderItems,
    addOrder: addOrderHandler,
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export default OrdersContext;
