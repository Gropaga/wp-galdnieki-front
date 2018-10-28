import React from 'react';
import Collapse from "reactstrap/lib/Collapse";
import Navbar from "reactstrap/lib/Navbar";
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import BreadcrumbItem from "reactstrap/lib/BreadcrumbItem";

import { Link } from 'react-router-dom'
import { _ } from '../../lib/i18n';
import NavLinkI18n from './NavLinkI18n'
import NavLinkLocaleSelect from './NavLinkLocaleSelect'
import NavbarBrandLocale from "./NavbarBrandLocale";

// TODO move into separate JSON config
const navItemsConfig = [
    'doors',
    'stairs',
    'windows',
    'furniture',
    'contacts',
];

export default class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.state = {
            isOpen: false
        };

        this.combineObject = this.combineObject.bind(this);
        this.getNodes = this.getNodes.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    close() {
        this.setState({
            isOpen: false
        });
    }
    render() {
        return (
            <Navbar color="white" light expand="lg">
                <NavbarBrandLocale history={this.props.history} onClick={ this.close } tag={Link} to="/">
                    <span style={{'fontWeight': 400}}>Rīgas Galdnieki</span>
                </NavbarBrandLocale>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        {
                            navItemsConfig.map(item =>
                                <NavItem key={item} onClick={ this.close }>
                                    <NavLinkI18n history={this.props.history} tag={Link} to={`/${item}`}>
                                        { _(item) }
                                     </NavLinkI18n>
                                </NavItem>
                            )
                        }
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLinkLocaleSelect history={this.props.history} tag={Link}
                                                 locale="ru">По-русски</NavLinkLocaleSelect>
                        </NavItem>
                        <NavItem>
                            <NavLinkLocaleSelect history={this.props.history} tag={Link}
                                                 locale="lv">Latviski</NavLinkLocaleSelect>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

    removeEmptyValues(acc) {
        return acc.filter(([, path]) => !!path);
    }

    getNodes(acc) {
        return acc.map(([key, value]) => <BreadcrumbItem key={value}>
            {key(value)}
        </BreadcrumbItem>);
    }

    getText(key) {
        return {
            language: _('home'),
            page: _(key),
            id: _(key),
        }[key];
    }

    combineObject([head, ...tail], acc = []) {
        return tail.length ? this.combineObject(this.addHeadObject(tail, head), [...acc, head]) : [...acc, head];
    }

    addHeadObject([[headKey, headText], ...tail], [appendKey, appendText]) {
        return [[headKey, appendText + headText], ...tail];
    }
}

