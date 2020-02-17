import * as actionTypes from "./actions/actions"

const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    console.log(state);
    if (action.type === actionTypes.INCREMENT) {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === actionTypes.DECREMENT) {
        return {
            ...state,
            counter: state.counter - 1
        }
    }
    if (action.type === actionTypes.ADD) {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    if (action.type === actionTypes.SUBTRACT) {
        return {
            ...state,
            counter: state.counter - action.value
        }
    }
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

const switchCaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1

            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1

            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter - action.value

            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value

            };
        default:
            break;
    }
    return state;
};

export default reducer;