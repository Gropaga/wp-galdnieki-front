import dict from "../../dict";

let locale = () => console.error('i18n not setup');

export const setup = (callback) => {
    locale = (objKey) => dict.langPaths[callback(objKey)];
};

export const _ = (key, language = locale('language')) => {
    if (
        dict.locales.strings[language] &&
        dict.locales.strings[language][key]
    ) {
        return dict.locales.strings[language][key];
    } else {
        return key;
    }
};

export const _pRev = (key, language = locale('language')) => {
    return reverseObject(dict.locales.paths[language])[key];
};

const reverseObject = (object) => {
    return Object.keys(object).reduce((acc, key) => {
        return Object.assign(acc, {[object[key]]: key});
    }, {});
};

export const _l = (language = locale('language')) => {
    return dict.langPaths[language];
};

export const _lRev = (language = locale('language')) => {
    return reverseObject(dict.langPaths)[language];
};

export const _p = (key, language = locale('language')) => (
    ((key) => {
        if (dict.locales &&
            dict.locales.paths[language] &&
            dict.locales.paths[language][key]
        ) {
            return `/${dict.locales.paths[language][key]}`;
        } else {
            return `/${key}`;
        }
    })(key.replace('/', ''))
);

export const getLocale = () => locale('language');