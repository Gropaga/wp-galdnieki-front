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

export default class MainNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
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
    render() {
        return (
            <Navbar color="white" light expand="lg">
                <NavbarBrandLocale history={this.props.history} tag={Link} to="/">
                    <span style={{'font-weight': 700}}>Rīgas Galdnieki</span>
                </NavbarBrandLocale>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/doors">{_('doors')}</NavLinkI18n>
                        </NavItem>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/stairs">{_('stairs')}</NavLinkI18n>
                        </NavItem>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/windows">{_('windows')}</NavLinkI18n>
                        </NavItem>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/furniture">{_('furniture')}</NavLinkI18n>
                        </NavItem>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/interiors">{_('interiors')}</NavLinkI18n>
                        </NavItem>
                        <NavItem>
                            <NavLinkI18n history={this.props.history} tag={Link}
                                         to="/contacts">{_('contacts')}</NavLinkI18n>
                        </NavItem>
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


    getBreadcrumbItems(pathMatch) {
        return [
            this.removeEmptyValues,
            this.combineObject,
            this.getNodes
        ].reduce((acc, func) => func(acc), [
            [(url) => <a href={url}>{ _('home') }</a>, pathMatch['language']],
            [(url) => <a href={url}>{ pathMatch['page'].replace('/','') }</a>, pathMatch['page']],
            [() => <a href="#">123</a>, pathMatch['id']],
        ]);
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

