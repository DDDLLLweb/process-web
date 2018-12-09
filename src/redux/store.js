import {createStore, applyMiddleware} from 'redux'
import combineReducers from './reducers.js'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
export const history = createHistory()
let store = createStore(combineReducers,applyMiddleware(thunkMiddleware))
export default store