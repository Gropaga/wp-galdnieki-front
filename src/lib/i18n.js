import config from "../../i18n";

let locale = () => console.error('i18n not setup');

export const setup = (callback) => {
    locale = (objKey) => config.pathMatch[callback(objKey)];
};

export const _ = (key, language = locale('language')) => {
    if (
        config.locales.strings[language] &&
        config.locales.strings[language][key]
    ) {
        return config.locales.strings[language][key];
    } else {
        return key;
    }
};

export const _pRev = (key, language = locale('language')) => {
    return reverseObject(config.locales)[key][language];
};

const reverseObject = (object) => {
    return Object.keys(object).reduce((acc, key) => {
        return Object.assign(acc, {[object[key]]: key});
    }, {});
};

export const _p = (key, language = locale('language')) => (
    ((key) => {
        if (config.locales &&
            config.locales.paths[language] &&
            config.locales.paths[language][key]
        ) {
            return `/${config.locales.paths[language][key]}`;
        } else {
            return `/${key}`;
        }
    })(key.replace('/', ''))
);

export const getLocale = () => locale();