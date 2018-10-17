// list tasks nen initialState la [], tham khao o app.js
import * as types from '../constants/ActionType';

var initialState = false; // Default close form

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            return !state;
        case types.OPEN_FORM:
            state = true;   
            return state;
        case types.CLOSE_FORM:
            state = false;       
            return state;
        default:
            return state;
    }
}

export default myReducer;