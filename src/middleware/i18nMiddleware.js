import { setLocale } from "../lib/i18n";
import { matchPath } from 'react-router';
import i18n from "../../i18n";

const locale = (history) => {
    return i18n.pathMatch[matchPath(history.location.pathname, {
        path: ':language(/ru|)',
        exact: false,
        strict: false
    }).params.language];
};