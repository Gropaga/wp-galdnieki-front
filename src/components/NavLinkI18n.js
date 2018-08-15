import React from 'react';
import { matchPath } from 'react-router'
import {
    NavLink,
} from 'reactstrap';

export default class NavLinkI18n extends React.Component {
    render() {
        console.log(
            matchPath(this.props.history.location.pathname, {
                path: ':language(/ru|):page(/w+|):resource(/w+|)',
                exact: false,
                strict: false
            })
        );
        return <NavLink { ...this.props }/>
    }


}