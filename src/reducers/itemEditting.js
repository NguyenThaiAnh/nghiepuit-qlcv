// list tasks nen initialState la [], tham khao o app.js
import * as types from '../constants/ActionType';

var initialState = {
    id : '',
    name : '',
    status : false
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
}



export default myReducer;