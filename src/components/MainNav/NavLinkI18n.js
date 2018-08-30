import React from 'react';
import { pathMatchByHistory } from "../../lib/pathMatch";
import { NavLink } from 'reactstrap';
import { _p } from '../../lib/i18n'

class NavLinkI18n extends React.Component {
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
        return pathMatchByHistory(this.props.history).language +
                _p(this.props.to);
    }
}

export default NavLinkI18n