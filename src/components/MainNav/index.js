import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { _, getLocale } from '../../lib/i18n';
import NavLinkI18n from './NavLinkI18n'
import NavLinkLocaleSelect from './NavLinkLocaleSelect'
import NavbarBrandLocale from "./NavbarBrandLocale";

export default class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="white" light expand="md">
                    <NavbarBrandLocale history={ this.props.history } tag={ Link } to="/">Galdnieks.lv</NavbarBrandLocale>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/doors">{ _('Doors') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/stairs">{ _('Stairs') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/windows">{ _('Windows') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/kitchens">{ _('Kitchen') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/interiors">{ _('Interior') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/contacts">{ _('Contacts') }</NavLinkI18n>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLinkLocaleSelect history={ this.props.history } tag={ Link } locale="ru">По-русски</NavLinkLocaleSelect>
                            </NavItem>
                            <NavItem>
                                <NavLinkLocaleSelect history={ this.props.history } tag={ Link } locale="lv">Latviski</NavLinkLocaleSelect>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}