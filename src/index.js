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
import { setup as i18nSetup } from "./lib/i18n";

const history = createBrowserHistory();

i18nSetup((key) => {
    return matchPath(history.location.pathname, {
        path: ':language(/ru|):page(/\w+|):item(/\w+|)',
        exact: false,
        strict: false
    }).params[key];
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
        applyMiddleware(
            thunkMiddleware,
            routerMiddleware(history),
            consoleLogger,
        ),
    ),
);

const path = (history) => {
    console.log(history.location.pathname);
    return matchPath(history.location.pathname, {
        path: ':language(/ru|):page(/w+|)',
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
