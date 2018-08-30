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
import { setup as i18nSetup } from "./lib/i18n";
import { pathMatch } from "./lib/pathMatch";

const history = createBrowserHistory();

i18nSetup(key => pathMatch(history.location.pathname)[key]);

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

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);
