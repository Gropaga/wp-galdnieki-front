import React from 'react';
import {
    NavbarBrand,
} from 'reactstrap';
import {pathMatchByHistory} from "../../lib/pathMatch";

export default class NavbarBrandLocale extends React.Component {
    render() {
        return <NavbarBrand
            to={pathMatchByHistory(this.props.history).language}
            tag={this.props.tag}
            children={this.props.children}
        />
    }
}