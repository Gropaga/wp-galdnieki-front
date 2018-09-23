import {
    DISPLAY_DATA,
    RECEIVE_ALL_DATA,
    RECEIVE_DATA,
    SELECT_SIZE,
    SELECT_COLOR,
    RESET_DISPLAY,
    RECEIVE_ERROR,
    DISPLAY_ALL_DATA,
} from '../actions/common';

const initState = {
    isFetching: true,
    allLoaded: {},
    doors: [],
    stairs: [],
    contacts: [],
    interiors: [],
    windows: [],
};

const commonReducer = (state = { ...initState }, {type, section, ...action}) => {
    switch (type) {
        case DISPLAY_ALL_DATA:
            return {
                ...state,
                isFetching: false
            };
        case DISPLAY_DATA:
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [action.itemId]: {
                        ...state[section][action.itemId],
                        display: true
                    }
                },
                isFetching: false
            };
        case RECEIVE_ALL_DATA:
            return {
                ...state,
                [section]: {
                    ...action.content[section],
                    ...state[section],
                    updated: action.receivedAt
                },
                isFetching: false,
                allLoaded: {
                    ...state.allLoaded,
                    [section]: action.receivedAt,
                },
            };
        case RECEIVE_DATA:
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [action.itemId]: {
                        ...action.content[section][action.itemId],
                        display: true,
                        updated: action.receivedAt,
                    },
                },
                isFetching: false
            };
        case SELECT_SIZE:
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [action.itemId]: {
                        ...state[section][action.itemId],
                        sizeSelect: {
                            height: action.height,
                            width: action.width
                        }
                    }
                }
            };
        case SELECT_COLOR:
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [action.itemId]: {
                        ...state[section][action.itemId],
                        colorSelect: action.colorIndex
                    }
                }
            };
        case RESET_DISPLAY:
            return {
                ...state,
                [section]: Object.keys(state[section]).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: {
                            ...state[section][key],
                            display: false
                        }
                    };
                }, {}),
            };
        case RECEIVE_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};

export default commonReducer