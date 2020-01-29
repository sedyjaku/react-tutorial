import React from "react";

import styles from "./buildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";
import PropTypes, {bool, number} from 'prop-types';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Tomato', type: 'tomato'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Mayo', type: 'mayo'},
    {label: 'Cheese', type: 'cheese'},
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}/>
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            ORDER NOW
        </button>
    </div>
);

BuildControls.propTypes = {
    price: PropTypes.number,
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    ordered: PropTypes.func,
    purchasable: PropTypes.bool
};

export default BuildControls