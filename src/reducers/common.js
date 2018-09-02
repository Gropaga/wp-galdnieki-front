import { LOCATION_CHANGE } from 'connected-react-router'
import { RECEIVE_ERROR } from '../actions/common'
import { getLocale, _l } from "../lib/i18n";
import { pathMatch } from "../lib/pathMatch";

const initState = {
    isFetching: true,
};

const commonReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                isFetching: isFetching(action)
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

const isFetching = action => {
    return pathMatch(action.payload.location.pathname).language === getLocale();
};

export default commonReducer