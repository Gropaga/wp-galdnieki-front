import React from 'react';
import {
    NavLink,
} from 'reactstrap';
import {pathMatchByHistory} from "../lib/pathMatch";
import { _pRev } from "../lib/i18n";
import locales from '../../i18n';

export default class NavLinkLocale extends React.Component {
    constructor(props) {
        super(props);
        this.getPath = this.getPath.bind(this);
    }

    render() {

        let page = pathMatchByHistory(this.props.history);

        console.log('hist', this.props.history);
        console.log('page', page);

        return <NavLink
            to={this.getPath(page)}
            tag={this.props.tag}
            children={this.props.children}
        />
    }

    getPath(page) {
        let rev = this.reverseObject(locales.locales.paths[this.props.locale])[page];

        console.log('rev', rev);
        console.log('page', page);

        

        return this.reverseObject(locales.pathMatch)[this.props.locale]
    }

    reverseObject(object) {
        return Object.keys(object).reduce((acc, key) => {
            return Object.assign(acc, {[object[key]]: key});
        }, {});
    };
}