import React from 'react'
import { Route } from 'react-router'
import localesConfig from '../config/locales.json'
import { setLocale } from './i18n';
import MainNav from '../components/bem/MainNav/index.js'

export default ({ component: Component, ...rest }) => {
    return <div>
        <Route {...rest} render={props => {
            return <Component locale={localesConfig[props.match.params.language]} {...props}/>
        }}/>
    </div>
}