import React from 'react';
import {
    NavLink,
} from 'reactstrap';
import {pathMatchByHistory} from "../lib/pathMatch";
import { _pRev } from "../lib/i18n";

export default class NavLinkLocale extends React.Component {
    constructor(props) {
        super(props);
        this.getPath = this.getPath.bind(this);
    }

    render() {

        let { language, page, resource } = pathMatchByHistory(this.props.history);

        console.log('language', language);
        console.log('page', page);

        let rev = _pRev(page, language);

        console.log('rev', rev);


        return <NavLink
            to={`/${this.props.locale}`}
            tag={this.props.tag}
            children={this.props.children}
        />
    }

    getPath() {
        return pathMatchByHistory(this.props.history).language +
            _pRev(this.props.to);
    }
}