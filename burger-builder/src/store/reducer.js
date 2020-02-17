import * as actionTypes from './actions'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.8,
    tomato: 0.1,
    cheese: 0.4,
    meat: 1.3,
    mayo: 0.01
};


const INITIAL_PRICE = 4;

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        tomato: 0,
        cheese: 0,
        meat: 0,
        mayo: 0
    },
    totalPrice: INITIAL_PRICE
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        default:
            return state
    }

};

export default reducer;