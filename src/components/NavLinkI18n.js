import React from 'react';
import { matchPath } from 'react-router'
import {
    NavLink,
} from 'reactstrap';

import { _p } from '../lib/i18n'


export default class NavLinkI18n extends React.Component {
    constructor(props) {
        super(props);
        this.getPath = this.getPath.bind(this);
    }

    render() {
        return <NavLink
            to={this.getPath()}
            tag={this.props.tag}
            children={this.props.children}
        />
    }

    getPath() {
        return matchPath(this.props.history.location.pathname, {
            path: ':language(/ru|):page(/w+|):resource(/w+|)',
            exact: false,
            strict: false
        }).params.language + _p(this.props.to);
    }
}