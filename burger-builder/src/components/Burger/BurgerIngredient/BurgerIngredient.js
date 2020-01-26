import React from "react";
import classes from './BurgerIngredient.css'
import propTypes, {string} from 'prop-types';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className="BreadBottom"/>;
            break;
        case('bread-top'):
            ingredient = (
                <div className="BreadTop">
                    <div className="Seeds1"/>
                    <div className="Seeds2"/>
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className="Meat"/>;
            break;
        case('cheese'):
            ingredient = <div className="Cheese"/>;
            break;
        case('salad'):
            ingredient = <div className="Salad"/>;
            break;
        case('bacon'):
            ingredient = <div className="Bacon"/>;
            break;
        case('tomato'):
            ingredient = <div className="Tomato"/>;
            break;
        case('mayo'):
            ingredient = <div className="Mayo"/>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

BurgerIngredient.propTypes = {
    type: string.isRequired
};

export default BurgerIngredient;