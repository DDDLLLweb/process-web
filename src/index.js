import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import AppRouter from './router/router';
import store from './redux/store';
renderWithHotReload(AppRouter());
function renderWithHotReload(RootElement) {
    ReactDOM.render(
            <Provider store={store}>
                {RootElement}
            </Provider>,
        document.getElementById('root')
    )
 }
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
