import config from "../../i18n";

let currentLocale = config.default;

export const _ = (key) => {
    if (config.locales && config.locales[currentLocale] && config.locales[currentLocale][key]) {
        return config.locales[currentLocale][key];
    } else {
        return key;
    }
};

export const setLocale = (locale) => {
    currentLocale = locale;
};
