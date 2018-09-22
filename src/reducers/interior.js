import {
    REQUEST_INTERIOR,
    RECEIVE_INTERIOR,
    SELECT_INTERIOR_SIZE,
    SELECT_INTERIOR_COLOR,
    RESET_DISPLAY_INTERIOR,
    DISPLAY_INTERIOR
} from '../actions/interior'

const initState = {
    isFetching: true,
    interiors: []
};

const interiorReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_INTERIOR:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_INTERIOR:
            return {
                ...state,
                interiors: {
                    ...state.interiors,
                    [action.interiorId]: {
                        ...action.content.interiors[action.interiorId],
                        display: true,
                        updated: action.receivedAt,
                    },
                },
                isFetching: false
            };
        case SELECT_INTERIOR_SIZE:
            return {
                ...state,
                interiors: {
                    ...state.interiors,
                    [action.interiorId]: {
                        ...state.interiors[action.interiorId],
                        sizeSelect: {
                            height: action.height,
                            width: action.width
                        }
                    }
                }
            };
        case SELECT_INTERIOR_COLOR:
            return {
                ...state,
                interiors: {
                    ...state.interiors,
                    [action.interiorId]: {
                        ...state.interiors[action.interiorId],
                        colorSelect: action.colorIndex
                    }
                }
            };
        case DISPLAY_INTERIOR:
            return {
                ...state,
                interiors: {
                    ...state.interiors,
                    [action.interiorId]: {
                        ...state.interiors[action.interiorId],
                        display: true
                    }
                },
                isFetching: false
            };
        case RESET_DISPLAY_INTERIOR:
            return {
                ...state,
                interiors: Object.keys(state.interiors).reduce((acc, key) => {
                    return {
                        ...acc,
                        [key]: {
                            ...state.interiors[key],
                            display: false
                        }
                    };
                }, {}),
            };
        default:
            return state
    }
};

export default interiorReducer