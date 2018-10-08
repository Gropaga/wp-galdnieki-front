import React from 'react';
import NavLink from 'reactstrap/lib/NavLink';
import {pathMatchByHistory} from "../../lib/pathMatch";
import { getLocale } from "../../lib/i18n";
import dict from '../../../dict';

export default class NavLinkLocaleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.getPath = this.getPath.bind(this);
        this.getPageUrlPart = this.getPageUrlPart.bind(this);
        this.getLanguageUrlPart = this.getLanguageUrlPart.bind(this);
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
            this.getPageUrlPart(pathParams)
        ].reduce((acc, part)=> {
            return part ? `${acc}/${part}` : acc;
        }, "");
    }

    getPageUrlPart(pathParams) {
        if (!pathParams.page) return "";
        return dict.locales.paths[this.props.locale][this.getCurrentPageKey(pathParams)];
    }

    getCurrentPageKey(pathParams) {
        return this.reverseObject(dict.locales.paths[getLocale()])[pathParams.page.replace('/','')];
    }

    getLanguageUrlPart() {
        return this.reverseObject(dict.langPaths)[this.props.locale].replace('/','');
    }


    reverseObject(object) {
        return Object.keys(object).reduce((acc, key) => {
            return Object.assign(acc, {[object[key]]: key});
        }, {});
    };
}