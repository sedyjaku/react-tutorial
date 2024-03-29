import * as actionTypes from "../actions/actions"

const initialState = {
    counter: 0
};

const counterReducer = (state = initialState, action) => {
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

export default counterReducer;