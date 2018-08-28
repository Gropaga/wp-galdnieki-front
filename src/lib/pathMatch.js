import { matchPath } from 'react-router'

export function pathMatch(path) {
    return matchPath(path, {
        path: ':language(/ru|):page(/[a-z0-9]+|):id(/[a-z0-9]+|)',
        exact: false,
        strict: false
    }).params;
}

export function pathMatchByHistory(history) {

    return pathMatch(history.location.pathname);
}