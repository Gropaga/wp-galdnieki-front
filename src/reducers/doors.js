import { REQUEST_DOORS, RECEIVE_DOORS, RECEIVE_ERROR,
    SELECT_DOOR_SIZE, SELECT_DOOR_COLOR} from '../actions/doors'

const initState = {
    isFetching: true,
    doors: [],
    jumbo: {},
    landingImage: null
};

const doorsReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_DOORS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_DOORS:
            return {
                ...state,
                ...action.content,
                isFetching: false,
                updated: action.receivedAt,
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
        default:
            return state
    }
};

export default doorsReducer