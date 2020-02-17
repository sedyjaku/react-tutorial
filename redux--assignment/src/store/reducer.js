import * as actionTypes from "./actions"

const initialState = {
    persons: []
};


const personReducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === actionTypes.ADD_PERSON) {
        return {
            ...state,
            persons: state.persons.concat(action.newPerson)
        }
    }
    if (action.type === actionTypes.REMOVE_PERSON) {
        const updatedArray = state.persons.filter(person => person.id !== action.personId);
        return {
            ...state,
            persons: updatedArray
        }
    }
    return state;
};

export default personReducer;