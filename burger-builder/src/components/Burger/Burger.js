import React, {useState} from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import "./Burger.css";

const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientType => {
            return [...Array(props.ingredients[ingredientType])].map((_, i) => {
                return <BurgerIngredient key={ingredientType + i} type={ingredientType}/>;
            } )
        })
        .reduce((array, element) => {
            return array.concat(element);
        }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default Burger;