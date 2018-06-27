import { REQUEST_HOME, RECEIVE_HOME, RECEIVE_ERROR} from '../actions/home'

const homeReducer = (state = { isFetching: true, content: null }, action) => {

    console.log('action.SDASDAS', action);

    switch (action.type) {
        case REQUEST_HOME:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_HOME:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.content
            });
        case RECEIVE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                content: action.content
            });
        default:
            return state
    }
};

export default homeReducer