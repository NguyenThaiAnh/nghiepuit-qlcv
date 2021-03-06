import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.css';

import 'jquery/src/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.min'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Import redux
import { createStore } from 'redux';
import myReducer from './reducers/index'
import { Provider } from 'react-redux';

var store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
