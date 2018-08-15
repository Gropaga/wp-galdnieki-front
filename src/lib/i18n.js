import config from "../../i18n";

let locale = () => console.error('i18n not setup');

export const setup = (callback) => {
    locale = (objKey) => config.pathMatch[callback(objKey)];
};

export const _ = (key) => {
    if (
        config.locales.strings[locale('language')] &&
        config.locales.strings[locale('language')][key]
    ) {
        return config.locales.strings[locale('language')][key];
    } else {
        return key;
    }
};

export const _p = (key) => (
    ((key) => {
        console.log(key);
        if (config.locales &&
            config.locales.paths[locale('language')] &&
            config.locales.paths[locale('language')][key]
        ) {
            return `/${config.locales.paths[locale('language')][key]}`;
        } else {
            return `/${key}`;
        }
    })(key.replace('/', ''))
);

export const getLocale = () => locale();