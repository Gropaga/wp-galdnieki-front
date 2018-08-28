import React from 'react'
import { Route } from 'react-router'
import localesConfig from '../config/locales.json'
import {pathMatchByHistory} from "./pathMatch";
import {_p} from "./i18n";

export default ({ component: Component, ...rest }) => {
    return <div>
        <Route {...rest} render={props => {
            return <Component
                path={constructPath(props.history, props.key, props.enableId)}
                locale={localesConfig[props.match.params.language]}
                {...props}
            />
        }}/>
    </div>
}

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