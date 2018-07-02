import React from 'react'
import { Route } from 'react-router'
import localesConfig from '../config/locales.json'

export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return <Component locale={localesConfig[props.match.params.language]} {...props}/>
    }}/>
)