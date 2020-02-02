import React, {Fragment, useEffect, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import axiosInstance from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.8,
    tomato: 0.1,
    cheese: 0.4,
    meat: 1.3,
    mayo: 0.01
};

const INITIAL_PRICE = 4;

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

    const [ingredients, setIngredients] = useState(
        {
            salad: 0,
            bacon: 0,
            tomato: 0,
            cheese: 0,
            meat: 0,
            mayo: 0
        }
    );

    const [price, setPrice] = useState(
        INITIAL_PRICE
    );

    const [errorInit, setErrorInit] = useState(false)

    const [loading, setLoading] = useState(false);

    const [purchasable, setPurchasable] = useState(false);

    const [purchasing, setPurchasing] = useState(false);
    const [ingredientsLoading, setIngredientsLoading] = useState(true);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        setLoading(true);
        const ingredientObjectList = Object.keys(ingredients)
            .map(ingredientKey => {
                return {
                    name: ingredientKey,
                    count: ingredients[ingredientKey]
                }
            });
        // alert("You continue");
        const order = {
            name: "orderFromReact!",
            price: price,
            user: {
                username: 'User 111',
                address: {
                    street: 'Street',
                    zip_code: 'ZipCody',
                    country: 'Country'
                },
                email: 'email@email.com'
            },
            delivery_method: 'fastest',
            burgers: [
                {
                    name: "JustThisOneBurgerFromReact!",
                    body: "DoesBurgerFromReactNeedABody?",
                    ingredients: ingredientObjectList,
                }
            ]
        };
        axiosInstance.post('http://127.0.0.1:8000/api/v1/order/', order)
            .then(response => {
                    setLoading(false);
                    setPurchasing(false);
                }
            )
            .catch(error => {
                    setLoading(false);
                    setPurchasing(false);
                }
            );
    };

    useEffect(() => {
        fetchIngredientsFromServer();
    }, [burgerId]);

    const fetchIngredientsFromServer = () => {
        axiosInstance.get('http://127.0.0.1:8000/api/v1/burger/' + burgerId)
            .then(response => {
                    let newIngredients = {...ingredients};
                    const responseIngredients = response.data.ingredients;
                    responseIngredients.forEach(ing =>
                        fetchIngredient(ing, newIngredients)
                    );
                    setIngredientsLoading(false);
                    setIngredients(newIngredients);
                    setPrice(parseFloat(response.data.price));
                    updatePurchasable(newIngredients);
                }
            )
            .catch(error => {
                    setIngredientsLoading(false);
                    setErrorInit(true);
                }
            );
    };

    const fetchIngredient = (ingredient, newIngredients) => {
        newIngredients[ingredient.name] = ingredient.count;
    };


    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;
        setIngredients(updatedIngredients);

        const oldPrice = price;
        const newPrice = price + INGREDIENT_PRICE[type];
        setPrice(newPrice);
        setPurchasable(true);
    };


    const updatePurchasable = (updatedIngredients) => {
        const ings = {
            ...updatedIngredients
        };
        const sum = Object.keys(ings)
            .map(ingredientKey => {
                return ings[ingredientKey];
            })
            .reduce((sum, element) => sum + element, 0);
        setPurchasable(sum > 0);
    };

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;
        setIngredients(updatedIngredients);

        const oldPrice = price;
        const newPrice = price - INGREDIENT_PRICE[type];
        setPrice(newPrice);
        updatePurchasable(updatedIngredients);
    };

    let orderSummary = <OrderSummary
        price={price}
        ingredients={ingredients}
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
                <Burger ingredients={ingredients}/>
                < BuildControls
                    price={price}
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    purchasable={purchasable}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);