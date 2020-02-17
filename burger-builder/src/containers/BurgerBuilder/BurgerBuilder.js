import React, {Fragment, useEffect, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import axiosInstance from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions'




const BurgerBuilder = (props) => {

    // const [ingredients, setIngredients] = useState(
    //     {
    //         salad: 1,
    //         bacon: 1,
    //         tomato: 3,
    //         cheese: 2,
    //         meat: 2,
    //         mayo: 1
    //     }
    // );

    const [burgerId, setBurgerId] = useState(93);

    // const [ingredients, setIngredients] = useState(
    //     {
    //         salad: 0,
    //         bacon: 0,
    //         tomato: 0,
    //         cheese: 0,
    //         meat: 0,
    //         mayo: 0
    //     }
    // );

    const [errorInit, setErrorInit] = useState(false)

    const [loading, setLoading] = useState(false);

    const [purchasable, setPurchasable] = useState(false);

    const [purchasing, setPurchasing] = useState(false);
    const [ingredientsLoading, setIngredientsLoading] = useState(false);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        // setLoading(true);
        // const ingredientObjectList = Object.keys(props.ingredients)
        //     .map(ingredientKey => {
        //         return {
        //             name: ingredientKey,
        //             count: props.ingredients[ingredientKey]
        //         }
        //     });
        // console.log(props);
        //
        // const queryParams = [];
        // for (let ing in props.ingredients) {
        //     queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(props.ingredients[ing]));
        // }
        // queryParams.push("price=" + props.price);
        // const queryString = queryParams.join('&');
        props.history.push(
            {
                pathname: "/checkout",
                // search: queryString
            }
        );
    };
    //
    // useEffect(() => {
    //     fetchIngredientsFromServer();
    // }, [burgerId]);

    // const fetchIngredientsFromServer = () => {
    //     axiosInstance.get('http://127.0.0.1:8000/api/v1/burger/' + burgerId)
    //         .then(response => {
    //                 let newIngredients = {...props.ingredients};
    //                 const responseIngredients = response.data.ingredients;
    //                 responseIngredients.forEach(ing =>
    //                     fetchIngredient(ing, newIngredients)
    //                 );
    //                 setIngredientsLoading(false);
    //                 setIngredients(newIngredients);
    //                 setPrice(parseFloat(response.data.price));
    //                 updatePurchasable(newIngredients);
    //             }
    //         )
    //         .catch(error => {
    //                 setIngredientsLoading(false);
    //                 setErrorInit(true);
    //                 return error;
    //             }
    //         );
    // };

    const fetchIngredient = (ingredient, newIngredients) => {
        newIngredients[ingredient.name] = ingredient.count;
    };


    const updatePurchasableState = (updatedIngredients) => {
        const ings = {
            ...updatedIngredients
        };
        const sum = Object.keys(ings)
            .map(ingredientKey => {
                return ings[ingredientKey];
            })
            .reduce((sum, element) => sum + element, 0);
        return sum > 0;
    };

    let orderSummary = <OrderSummary
        price={props.price}
        ingredients={props.ingredients}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}/>

    if (loading) {
        orderSummary = <Spinner/>
    }
    let burger = <Spinner/>;
    if (!ingredientsLoading) {
        if (errorInit) {
            burger = <p>Failed to load initial burger</p>
        } else {
            burger = <Fragment>
                <Burger ingredients={props.ingredients}/>
                < BuildControls
                    price={props.price}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    purchasable={updatePurchasableState(props.ingredients)}
                    ordered={purchaseHandler}
                /></Fragment>
        }
    } else {
    }
    let modal = null;
    //is called less times  but has no "fly in" effect
    if (purchasing) {
        modal = <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
            {orderSummary}
        </Modal>
    }

    return (
        <Fragment>
            {modal}
            {burger}
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));