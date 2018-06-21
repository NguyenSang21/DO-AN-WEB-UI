import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';

var username = (state = null, action) => {
    switch (action.type){
        case 'LOG_IN':
            return action.username;
        case 'LOG_OUT':
            return null;
        default:
            return state;
    }
}

var token = (state = null, action) => {
    switch (action.type){
        case 'TOKEN':
            return action.token;
        case 'TOKEN_OUT':
            return null;
        default:
            return state;
    }
}

var redux = require('redux');
var reducer = redux.combineReducers ({username, token});
var store = redux.createStore(reducer);
// console.log(store.getState());
//store.dispatch({type: 'LOG_IN',username: 'sang'});
//console.log(store.getState());
// store.dispatch({type: 'LOG_OUT'});
// console.log(store.getState());


ReactDOM.render(
        <Provider store = {store}>
            <Router>
            <div>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route exact path='/Login' component={Login} />
                        <Route exact path='/loaisp' component={Main} />
                        <Route exact path='/user' component={Main} />
                        <Route exact path='/status' component={Main} />
                    </Switch>
            </div>
            </Router>
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
