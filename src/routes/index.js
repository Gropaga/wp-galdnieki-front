import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home/index'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch/index'
import Index from '../components/MainNav/index'
import { _p } from "../lib/i18n";
import { pathMatchByHistory } from "../lib/pathMatch";

export default (history) => {
    return <div className="container">
        <Index history={history} />
        <Switch>
            <Route exact history={history} path={constructPath(history)} component={Home}/>
            <Route exact history={history} path={constructPath(history, 'doors')} component={Counter}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
};

const constructPath = (history, key = null, enableId = false) => {
    return [
        getLanguage(history),
        getSection(key),
        getId(enableId),
    ].reduce((acc, part)=> {
        return part ? `${acc}${part}` : acc;
    }, "");
};

const getLanguage = (history) => {
    return pathMatchByHistory(history)['language'] ?
        `:language(${pathMatchByHistory(history)['language']})` :
        ':language(|/)';
};

const getSection = (key) => {
    return key ? `:section(${_p(key)})` : '';
};

const getId = (enableId) => {
    return enableId ? ':id(/[a-z0-9]+)' : '';
};