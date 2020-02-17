import React from "react";

import styles from './checkoutsummary.module.css'
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
};

export default checkoutSummary;