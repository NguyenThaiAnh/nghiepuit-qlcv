import { combineReducers } from 'redux';
import tasks from './Tasks';
import isDisplayForm from './isDisplayForm'
import itemEditting from './itemEditting'

const myReducer = combineReducers({
    tasks, // tasks:
    isDisplayForm,
    itemEditting
});

export default myReducer;