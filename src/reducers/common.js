import { RECEIVE_DATA, DISPLAY_DATA, RECEIVE_ERROR } from '../actions/common';

const initState = {
    isFetching: true,
};

const commonReducer = (state = { ...initState }, {type, ...action}) => {
    switch (type) {
        case DISPLAY_DATA:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_DATA:
            return {
                ...state,
                [action.section]: {
                    ...action.content[action.section],
                    ...state[action.section],
                    updated: action.receivedAt
                },
                isFetching: false,
            };
        case RECEIVE_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
};

export default commonReducer