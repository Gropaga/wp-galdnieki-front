import {
    DISPLAY_DATA,
    RECEIVE_ALL_DATA,
    RECEIVE_DATA,
    SELECT_SIZE,
    SELECT_COLOR,
    RESET_DISPLAY,
    RECEIVE_ERROR,
    DISPLAY_ALL_DATA,
    START_RECEIVE_DATA,
} from '../actions/common';

const commonReducer = (state = {}, {type, ...action}) => {
    switch (type) {
        case DISPLAY_ALL_DATA:
            return {
                ...state,
                isFetching: false
            };
        case START_RECEIVE_DATA:
            return {
                ...state,
                [action.section]: {
                    ...state[action.section],
                    loading: true,
                }
            };
        case DISPLAY_DATA:
            return {
                ...state,
                [action.section]: {
                    ...state[action.section],
                    [action.itemId]: {
                        ...state[action.section][action.itemId],
                        display: true
                    }
                },
                isFetching: false
            };
        case RECEIVE_ALL_DATA:
            return Object.entries(action.content.data).reduce((newState, [section, data]) => {
                return {
                    ...newState,
                    [section]: {
                        ...data,
                        ...state[section],
                        loading: false,
                        updated: action.receivedAt
                    },
                }
            }, {
                ...state,
                isFetching: false,
                allLoaded: {
                    ...state.allLoaded,
                    [action.page]: action.receivedAt,
                },
            });
        case RECEIVE_DATA:
            return Object.entries(action.content.data).reduce((newState, [section, data]) => {
                return {
                    ...newState,
                    [section]: {
                        ...newState[section],
                        [action.itemId]: {
                            ...data[action.itemId],
                            display: true,
                            updated: action.receivedAt
                        }
                    }
                }
            }, {
                ...state,
                isFetching: false,
            });
        case SELECT_SIZE:
            return {
                ...state,
                [action.section]: {
                    ...state[action.section],
                    [action.itemId]: {
                        ...state[action.section][action.itemId],
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
                [action.section]: {
                    ...state[action.section],
                    [action.itemId]: {
                        ...state[action.section][action.itemId],
                        colorSelect: action.colorIndex
                    }
                }
            };
        case RESET_DISPLAY:
            return {
                ...state,
                [action.section]: Object.keys(state[action.section]).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: {
                            ...state[action.section][key],
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