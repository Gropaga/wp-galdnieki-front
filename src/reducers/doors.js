import { RECEIVE_DOORS, SELECT_DOOR_SIZE, SELECT_DOOR_COLOR, DISPLAY_DOORS } from '../actions/doors'

const initState = {
    doors: [],
};

const doorsReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case DISPLAY_DOORS:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_DOORS:
            return {
                ...state,
                doors: {
                    // this way changed colours and sizes will preserve
                    ...action.content.doors,
                    ...state.doors,
                },
                isFetching: false,
                doorsUpdated: action.receivedAt,
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
        default:
            return state
    }
};

export default doorsReducer