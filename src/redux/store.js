import { createStore,combineReducers,compose,applyMiddleware } from 'redux'
import { app, login,metaq } from './reducer/'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './effects'

export const history = createHistory()
const sagaMiddleware = createSagaMiddleware()

const initialState = {}
const enhancers = []
const middleware = [sagaMiddleware, routerMiddleware(history)]

const reducer = combineReducers({
  app,
  login,
  metaq,
  router: routerReducer,
})

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

// compose 从右到左来组合多个函数。
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers) 

export default function configureStore() {
  const store = createStore(reducer, initialState,composedEnhancers)
  sagaMiddleware.run(rootSaga)
  return store
}
   