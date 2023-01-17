import {createStore , compose , applyMiddleware } from 'redux'
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk'


const composeApp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store= createStore(rootReducer, composeApp(applyMiddleware(thunkMiddleware)));