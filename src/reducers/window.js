import {
    REQUEST_WINDOW,
    RECEIVE_WINDOW,
    SELECT_WINDOW_SIZE,
    SELECT_WINDOW_COLOR,
    RESET_DISPLAY_WINDOW,
    DISPLAY_WINDOW
} from '../actions/window'

const initState = {
    isFetching: true,
    windows: []
};

const windowReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_WINDOW:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_WINDOW:
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.windowId]: {
                        ...action.content.windows[action.windowId],
                        display: true,
                        updated: action.receivedAt,
                    },
                },
                isFetching: false
            };
        case SELECT_WINDOW_SIZE:
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.windowId]: {
                        ...state.windows[action.windowId],
                        sizeSelect: {
                            height: action.height,
                            width: action.width
                        }
                    }
                }
            };
        case SELECT_WINDOW_COLOR:
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.windowId]: {
                        ...state.windows[action.windowId],
                        colorSelect: action.colorIndex
                    }
                }
            };
        case DISPLAY_WINDOW:
            return {
                ...state,
                windows: {
                    ...state.windows,
                    [action.windowId]: {
                        ...state.windows[action.windowId],
                        display: true
                    }
                },
                isFetching: false
            };
        case RESET_DISPLAY_WINDOW:
            return {
                ...state,
                windows: Object.keys(state.windows).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: {
                            ...state.windows[key],
                            display: false
                        }
                    };
                }, {}),
            };
        default:
            return state
    }
};

export default windowReducer