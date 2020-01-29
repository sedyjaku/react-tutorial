import React from "react";
import styles from "./navigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
    <ul className = {styles.NavigationItems}>
        <NavigationItem link ="/" active>Burger Builder</NavigationItem>
        <NavigationItem link ="/">Checkout</NavigationItem>
        <NavigationItem link ="/">About</NavigationItem>
    </ul>
);

export default NavigationItems;