import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { _ } from '../../../lib/i18n';

export default class MainNav extends React.Component {
    constructor(props) {
        super(props);

        console.log('rest', props);

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
                    <NavbarBrand tag={ Link } to="/">Galdnieks.lv</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={ Link } to="/counter">{ _('Doors') }</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/counter">{ _('Stairs') }</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/counter">Окна</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/counter">Кухни</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/counter">Интерьер</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={ Link } to="/ru">По-русски</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={ Link } to="/">Latviski</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}