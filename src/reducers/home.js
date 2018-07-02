import { REQUEST_HOME, RECEIVE_HOME, RECEIVE_ERROR} from '../actions/home'

const initState = {
    isFetching: true,
    content: null,
    doors: [],
    jumbo: {},
    landingImage: null
};

const homeReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case REQUEST_HOME:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_HOME:
            return {
                ...state,
                ...action.content,
                isFetching: false,
                updated: Date.now()
            };
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.content,
                updated: Date.now()
            });
        default:
            return state
    }
};

export default homeReducer