import { RECEIVE_STAIRS, DISPLAY_STAIRS } from '../actions/stairs'

const initState = {
    stairs: [],
};

const stairsReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case DISPLAY_STAIRS:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_STAIRS:
            return {
                ...state,
                stairs: {
                    ...action.content.stairs,
                    ...state.stairs,
                },
                isFetching: false,
                stairsUpdated: action.receivedAt,
            };
        default:
            return state
    }
};

export default stairsReducer