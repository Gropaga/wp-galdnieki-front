import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home/index'
import NoMatch from '../components/NoMatch/index'
import MainNav from '../components/MainNav/index'
import Doors from '../components/Doors/index'
import Windows from '../components/Windows/index'
import Window from '../components/Window/index'
import Stairs from '../components/Stairs/index'
import Contacts from '../components/Contacts/index'
import Furniture from '../components/Furniture/index'
import Door from '../components/Door/index'
import Interior from '../components/Interior/index'
import Interiors from '../components/Interiors/index'
import {_lRev, _p} from "../lib/i18n";

export default (history) => {
    return <div className="container">
        <MainNav history={history} />
        <Switch>
            { ['lv', 'ru'].map((language) => {
                    return [
                        <Route exact path={constructPath(language)} component={Home}/>,
                        <Route exact path={constructPath(language, 'windows')} component={Windows}/>,
                        <Route exact path={constructPath(language, 'windows', true)} component={Window}/>,
                        <Route exact path={constructPath(language, 'doors')} component={Doors}/>,
                        <Route exact path={constructPath(language, 'doors', true)} component={Door}/>,
                        <Route exact path={constructPath(language, 'stairs')} component={Stairs}/>,
                        <Route exact path={constructPath(language, 'contacts')} component={Contacts}/>,
                        <Route exact path={constructPath(language, 'furniture')} component={Furniture}/>,
                        <Route exact path={constructPath(language, 'interiors')} component={Interiors}/>,
                        <Route exact path={constructPath(language, 'interiors', true)} component={Interior}/>,
                    ];
                }
            ) }
            <Route component={NoMatch}/>
        </Switch>
    </div>
};

const constructPath = (language, section = null, enableId = false) => {
    return [
        getLanguagePath(language),
        getSectionPath(section, language),
        getIdPath(enableId),
    ].reduce((acc, part)=> {
        return part ? `${acc}${part}` : acc;
    }, "");
};

const getLanguagePath = (language) => {
    return ((lang) => {
        return lang ? `:language(${lang})` : ':language(|/)';
    })(_lRev(language));
};

const getSectionPath = (key, language) => {
    return key ? `:section(${_p(key, language)})` : '';
};

const getIdPath = (enableId) => {
    return enableId ? ':id(/[a-z0-9]+)' : '';
};