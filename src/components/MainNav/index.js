import React from 'react';
import Collapse from "reactstrap/lib/Collapse";
import Navbar from "reactstrap/lib/Navbar";
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";

import { Link } from 'react-router-dom'
import { _, getLocale } from '../../lib/i18n';
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
                <NavbarBrandLocale history={this.props.history} tag={Link} to="/">
                    <span onClick={ this.close } style={{'fontWeight': 400}}>Rīgas Galdnieki</span>
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
                        {
                            getLocale() === 'lv' ?
                                <NavItem>
                                    <NavLinkLocaleSelect history={this.props.history} tag={Link}
                                                         locale="ru">По-русски</NavLinkLocaleSelect>
                                </NavItem>  :
                                <NavItem>
                                    <NavLinkLocaleSelect history={this.props.history} tag={Link}
                                                         locale="lv">Latviski</NavLinkLocaleSelect>
                                </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

