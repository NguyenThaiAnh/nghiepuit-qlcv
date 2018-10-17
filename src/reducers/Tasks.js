// list tasks nen initialState la [], tham khao o app.js
import * as types from '../constants/ActionType';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];


var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var onGenerateID = () => {
    return  s4() + s4()+ s4()+ s4();
};


var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: onGenerateID(),
                name: action.task.name,
                status: action.task.status
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            var { id } = action
            // Find task have id 
            let idOfTasks = state.findIndex(task => task.id === id)
            
            // let cloneTask = {...state[idOfTasks]}; 
            // cloneTask.status = !cloneTask.status;
            // state[idOfTasks] = cloneTask;

            state[idOfTasks] = {
                ...state[idOfTasks],
                status: !state[idOfTasks].status
            }

            // Save localStorage
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;