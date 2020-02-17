import * as actionTypes from "../actions/actions"

const initialState = {
    results: []
};

const resultReducer = (state = initialState, action) => {
    if (action.type === actionTypes.STORE_RESULT) {
        //Either like this
        const newResults = [...state.results, state.counter];
        return {
            ...state,
            //or like this
            results: state.results.concat({id: new Date(), value: action.result})
        }
    }
    if (action.type === actionTypes.DELETE_RESULT) {
        const id = 2;
        // const newResults = [...state.results];
        // newResults.splice(id, 1);
        const updatedArray = state.results.filter(element => element.id !== action.elementId);
        return {
            ...state,
            // results: newResults
            results: updatedArray
        }
    }
    return state;
};

export default resultReducer;