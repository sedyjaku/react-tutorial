import React from "react";
import styles from "./ingredientorder.module.css"

const IngredientOrder = (props) => {
    return (
        <span className={styles.IngredientOrder}>{props.ingredientName}: {props.ingredientCount}</span>
    )
};

export default IngredientOrder;