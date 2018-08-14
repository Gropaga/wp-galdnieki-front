import config from "../../i18n";

let locale = () => console.error('i18n not setup');

export const setup = (callback) => {
    locale = () => config.pathMatch[callback()];
};

export const _ = (key) => {
    if (
        config.locales.strings[locale()] &&
        config.locales.strings[locale()][key]
    ) {
        return config.locales.strings[locale()][key];
    } else {
        return key;
    }
};

export const _p = (path) => {
    if (config.locales &&
        config.locales.paths[locale()] &&
        config.locales.paths[locale()][key]
    ) {
        return config.paths[locale()][key];
    } else {
        return key;
    }
};

export const getLocale = () => locale();