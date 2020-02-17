import React from "react";
import styles from "./order.module.css"
import BurgerOrder from "./BurgerOrder/BurgerOrder";

const Order = (props) => {

    const burgers = [];

    props.order.burgers.forEach(burger => {
        burgers.push(<BurgerOrder key={burger.id} burger = {burger}/>)
    });

    return <div className={styles.Order}>
        <p>Order {props.order.id}</p>
        <p>Delivery method: {props.order.deliveryMethod}</p>
        <p>Price: {props.order.price}€</p>
        {burgers}
    </div>
};

export default Order;