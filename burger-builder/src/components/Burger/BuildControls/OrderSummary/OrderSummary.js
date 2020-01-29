import React, {Fragment} from "react";
import Button from "../../../UI/Button/Button";
import PropTypes from 'prop-types';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingredientKey}: {props.ingredients[ingredientKey]}
                    </span>
                </li>
            )
        });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType = "Danger" clicked = {props.purchaseCanceled}>CANCEL</Button>
            <Button buttonType = "Success" clicked = {props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

OrderSummary.propTypes = {
    price: PropTypes.number,
    purchaseCanceled: PropTypes.func,
    purchaseContinued: PropTypes.func,
    ingredients: PropTypes.object
};

export default OrderSummary;