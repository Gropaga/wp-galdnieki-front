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
import { _, getLocale } from '../../../lib/i18n';
import NavLinkI18n from '../../NavLinkI18n'
import NavLinkLocale from '../../NavLinkLocale'

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
        console.log('getLocale()', getLocale());
        return (
            <div>
                <Navbar color="white" light expand="md">
                    <NavbarBrand tag={ Link } to="/">Galdnieks.lv</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/counter">{ _('Doors') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/counter">{ _('Stairs') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/counter">{ _('Windows') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/counter">{ _('Kitchen') }</NavLinkI18n>
                            </NavItem>
                            <NavItem>
                                <NavLinkI18n history={ this.props.history } tag={ Link } to="/counter">{ _('Interior') }</NavLinkI18n>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLinkLocale history={ this.props.history }  tag={ Link } to="/ru">По-русски</NavLinkLocale>
                            </NavItem>
                            <NavItem>
                                <NavLinkLocale history={ this.props.history }  tag={ Link } to="/">Latviski</NavLinkLocale>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}