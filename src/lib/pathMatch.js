import { matchPath } from 'react-router'

export function pathMatch(path) {
    // TODO path regex is not correct
    return matchPath(path, {
        path: ':language(/ru|):page(/\w+|):resource(\w+|)',
        exact: false,
        strict: false
    }).params;
}

export function pathMatchByHistory(history) {
    return pathMatch(history.location.pathname);
}