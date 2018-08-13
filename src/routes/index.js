import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home/index'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import MainNav from '../components/bem/MainNav/index.js'

import LocaleRoute from '../lib/LocaleRoute'

const routes = (history, path, locale) => {

    return <div className="container">
        <MainNav exact path={path} locale={locale} history={history} />
        <Switch>
            <LocaleRoute exact path=":language(/ru|)" component={Home}/>
            <LocaleRoute exact path=":language(/ru|)/counter" component={Counter}/>
            <LocaleRoute component={NoMatch}/>
        </Switch>
    </div>
};



export default routes