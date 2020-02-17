import React, {useState} from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./burger.module.css";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

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
        <div className = {styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

Burger.propTypes = {
    ingredients: PropTypes.object
};

export default withRouter(Burger);