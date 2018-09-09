import { RECEIVE_HOME, SELECT_DOOR_SIZE, SELECT_DOOR_COLOR, DISPLAY_HOME} from '../actions/home'

const initState = {
    isFetching: true,
    doors: [],
    windows: [],
    jumbo: {},
    landingImage: null
};

const homeReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case DISPLAY_HOME:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_HOME:
            return {
                ...state,
                doors: {
                    ...action.content.doors,
                    ...state.doors
                },
                windows: {
                    ...action.content.windows,
                    ...state.windows
                },
                jumbo: action.content.jumbo,
                landingImage: action.content.landingImage,
                isFetching: false,
                homeUpdated: action.receivedAt,
            };
        case SELECT_DOOR_SIZE:
            return {
                ...state,
                doors: {
                    ...state.doors,
                    [action.doorId]: {
                        ...state.doors[action.doorId],
                        sizeSelect: {
                            height: action.height,
                            width: action.width
                        }
                    }
                },
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
        case SELECT_DOOR_COLOR:
            return {
                ...state,
                doors: {
                    ...state.doors,
                    [action.doorId]: {
                        ...state.doors[action.doorId],
                        colorSelect: action.colorIndex
                    }
                },
                windows: {
                    ...state.windows,
                    [action.windowId]: {
                        ...state.doors[action.windowId],
                        colorSelect: action.colorIndex
                    }
                }
            };
        default:
            return state
    }
};

export default homeReducer