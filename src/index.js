import 'whatwg-fetch';

import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './reducers'
import './style/index.scss';
import consoleLogger from './middleware/consoleLogger'
import { matchPath } from 'react-router'
import i18n from "./middleware/i18n";

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history),
            consoleLogger,
            i18n(history)
        ),
    ),
);

const path = (history) => {
    return matchPath(history.location.pathname, {
        path: ':language(/ru|)',
        exact: false,
        strict: false
    });
};

ReactDOM.render(
    <Provider store={store}>
        <App
            path={path(history)}
            history={history}
        />
    </Provider>,
    document.getElementById('root')
);
