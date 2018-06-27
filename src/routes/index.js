import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home/index'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import MainNav from '../components/bem/MainNav/index.js'


const routes = (history) => (
    <div className="container">
        <MainNav pathname={ history.location.pathname } />
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </div>
);

export default routes