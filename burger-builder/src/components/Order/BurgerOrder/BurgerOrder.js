import React from "react";
import IngredientOrder from "./IngredientOrder/IngredientOrder";
import styles from "./burgerorder.module.css"

const BurgerOrder = (props) => {

    const ingredients = [];

    Object.keys(props.burger.ingredients).map
    (ingredientKey => (
        ingredients.push(
            <IngredientOrder
                key = {ingredientKey}
                ingredientName={ingredientKey}
                ingredientCount={props.burger.ingredients[ingredientKey]}
            />
        )
    ));

    Object.keys(ingredients)
        .map(ingredientKey => {
            return {
                name: ingredientKey,
                count: ingredients[ingredientKey]
            }
        });

    return (
        <ul className={styles.BurgerOrder}>Burger {props.burger.name}
            {ingredients}
        </ul>
    )
};

export default BurgerOrder;