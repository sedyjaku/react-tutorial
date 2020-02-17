import React, {useEffect, useState} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

const Checkout = (props) => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    return (
        <div>
            <CheckoutSummary
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
                ingredients={props.ingredients}/>
            <Route path={props.match.path + '/contact-data'}
                   component={ContactData}/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);