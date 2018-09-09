import { RECEIVE_WINDOWS, SELECT_WINDOW_SIZE, SELECT_WINDOW_COLOR, DISPLAY_WINDOWS } from '../actions/windows'

const initState = {
    windows: [],
};

const windowsReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case DISPLAY_WINDOWS:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_WINDOWS:
            return {
                ...state,
                windows: {
                    ...action.content.windows,
                    ...state.windows,
                },
                isFetching: false,
                windowsUpdated: action.receivedAt,
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
        default:
            return state
    }
};

export default windowsReducer