// list tasks nen initialState la [], tham khao o app.js
import * as types from '../constants/ActionType';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
    
        default:
            return state;
    }
}

export default myReducer;