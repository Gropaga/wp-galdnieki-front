import {
    REQUEST_DOOR,
    RECEIVE_DOOR,
    RECEIVE_ERROR,
    SELECT_DOOR_SIZE,
    SELECT_DOOR_COLOR,
    FETCHING_TOGGLE_DOOR,
    DISPLAY_DOOR
} from '../actions/door'

const initState = {
    isFetching: true,
    doors: []
};

const doorReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_DOOR:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_DOOR:
            return {
                ...state,
                doors: {
                    ...state.doors,
                    [action.doorId]: {
                        ...action.content.doors[action.doorId],
                        display: true,
                        updated: action.receivedAt,
                    }
                },
                isFetching: false
            };
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.content,
                updated: action.receivedAt
            });
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
                }
            };
        case DISPLAY_DOOR:
            return {
                ...state,
                doors: {
                    ...state.doors,
                    [action.doorId]: {
                        ...state.doors[action.doorId],
                        display: true
                    }
                },
                isFetching: false
            };
        case FETCHING_TOGGLE_DOOR:
            return {
                ...state,
                doors: Object.keys(state.doors).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: {
                            ...state.doors[key],
                            display: false
                        }
                    };
                }, {}),
                isFetching: action.isFetching
            };
        default:
            return state
    }
};

export default doorReducer