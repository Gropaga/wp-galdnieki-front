import React from 'react';
import { Route, Switch } from 'react-router';
import Analytics from '../components/Analytics/index';
import Home from '../components/Home/index';
import NoMatch from '../components/NoMatch/index';
import MainNav from '../components/MainNav/index';
import {_lRev, _p} from "../lib/i18n";

import manyItems from "../components/Common/ManyItems";
import singleItem from "../components/Common/SingleItem";
import simplePage from "../components/Common/SimplePage";

export default (history) => {
    return <div className="container">
        <MainNav history={history} />
        <Analytics history={history}>
            <Switch>
                { ['lv', 'ru'].map((language) => {
                        return [
                            <Route exact path={constructPath(language)} component={Home}/>,
                            <Route exact path={constructPath(language, 'windows')} component={manyItems('windows')}/>,
                            <Route exact path={constructPath(language, 'windows', true)} component={singleItem('windows')}/>,
                            <Route exact path={constructPath(language, 'doors')} component={manyItems('doors')}/>,
                            <Route exact path={constructPath(language, 'doors', true)} component={singleItem('doors')}/>,
                            <Route exact path={constructPath(language, 'stairs')} component={simplePage('stairs')}/>,
                            <Route exact path={constructPath(language, 'contacts')} component={simplePage('contacts')}/>,
                            <Route exact path={constructPath(language, 'furniture')} component={simplePage('furniture')}/>,
                            <Route exact path={constructPath(language, 'interiors')} component={manyItems('interiors')}/>,
                            <Route exact path={constructPath(language, 'interiors', true)} component={singleItem('interiors')}/>,
                        ];
                    }
                ) }
                <Route component={NoMatch}/>
            </Switch>
        </Analytics>
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