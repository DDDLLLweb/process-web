import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore,{ history } from './redux/store'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoginForm from './pages/login/'
import App from './App'
// import { MainContent } from './components/';
import { networkUtils } from './utils'

const store = configureStore()

networkUtils.csrf().then(function() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app" />} />
          <Route path="/app" component={App}>
            {/* <IndexRoute component={MainContent} /> */}
            {/* <Route path="/dashboard" component={MainContent} />
                    <Route path="/mqctl/metaq" component={MainContent} /> */}
            {/* { routesNode } */}
                    
          </Route>
          <Route path="/login" component={LoginForm} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
})
