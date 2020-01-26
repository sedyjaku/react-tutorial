import React, {Fragment, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.8,
    tomato: 0.1,
    cheese: 0.4,
    meat: 1.3,
    mayo: 0.01
}

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
        4
    );

    const [purchasable, setPurchasable] = useState(false);

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

    return (
        <Fragment>
            <Burger ingredients={ingredients}/>
            <BuildControls
                price={price}
                ingredientAdded={addIngredientHandler}
                ingredientRemoved={removeIngredientHandler}
                purchasable={purchasable}
            />
        </Fragment>
    )
};

export default BurgerBuilder;