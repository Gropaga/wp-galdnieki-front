import React from 'react';
import {
    NavLink,
} from 'reactstrap';
import {pathMatchByHistory} from "../lib/pathMatch";
import { getLocale } from "../lib/i18n";
import locales from '../../i18n';

export default class NavLinkLocale extends React.Component {
    constructor(props) {
        super(props);
        this.getPath = this.getPath.bind(this);
        this.getPageUrlPart = this.getPageUrlPart.bind(this);
        this.getLanguageUrlPart = this.getLanguageUrlPart.bind(this);
        this.getIdUrlPart = this.getIdUrlPart.bind(this);
    }

    render() {
        return <NavLink
            to={this.getPath(pathMatchByHistory(this.props.history))}
            tag={this.props.tag}
            children={this.props.children}
        />
    }

    getPath(pathParams) {
        return [
            this.getLanguageUrlPart(pathParams),
            this.getPageUrlPart(pathParams),
            this.getIdUrlPart(pathParams)
        ].reduce((acc, part)=> {
            console.log('acc', acc);
            console.log('part', part);
            return part ? `${acc}/${part}` : acc;
        }, "");
    }

    getPageUrlPart(pathParams) {
        if (!pathParams.page) return "";
        return locales.locales.paths[this.props.locale][this.getCurrentPageKey(pathParams)];
    }

    getCurrentPageKey(pathParams) {
        console.log('getCurrentPageKey', this.reverseObject(locales.locales.paths[getLocale()])[pathParams.page.replace('/','')]);
        return this.reverseObject(locales.locales.paths[getLocale()])[pathParams.page.replace('/','')];
    }

    getLanguageUrlPart() {
        return this.reverseObject(locales.pathMatch)[this.props.locale].replace('/','');
    }

    getIdUrlPart(pathParams) {
        return !!pathParams.id ? pathParams.id : "";
    }

    reverseObject(object) {
        return Object.keys(object).reduce((acc, key) => {
            return Object.assign(acc, {[object[key]]: key});
        }, {});
    };
}