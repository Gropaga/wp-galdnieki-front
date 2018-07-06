import { REQUEST_HOME, RECEIVE_HOME, RECEIVE_ERROR,
    SELECT_DOOR_SIZE} from '../actions/home'

const initState = {
    isFetching: true,
    doors: [],
    jumbo: {},
    landingImage: null
};

const homeReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_HOME:
            return Object.assign({}, state, {
                isFetching: true,
                helloworld: "333333"
            });
        case RECEIVE_HOME:
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
                        selected: {
                            height: action.height,
                            width: action.width
                        }
                    }
                }
            };
        default:
            return state
    }
};

export default homeReducer