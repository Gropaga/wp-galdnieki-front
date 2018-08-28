import React from 'react'
import { Switch } from 'react-router'
import Home from '../components/Home/index'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import MainNav from '../components/bem/MainNav/index.js'

import LocaleRoute from '../lib/LocaleRoute'

export default (history) => {
    return <div className="container">
        <MainNav history={history} />
        <Switch>
            <LocaleRoute exact history={history} component={Home}/>
            <LocaleRoute exact history={history} section='doors' component={Counter}/>
            <LocaleRoute component={NoMatch}/>
        </Switch>
    </div>
};