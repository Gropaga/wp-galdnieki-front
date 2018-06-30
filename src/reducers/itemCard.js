import { OPEN_DROPDOWN, CLOSE_DROPDOWN } from '../actions/itemCard'

const itemCardReducer = (state = {} , {action}) => {
    switch (action.type) {
        case OPEN_DROPDOWN:
            return Object.assign({}, state, {
                [action.dropdownId]: {
                    isOpen: true
                }
            });
        case CLOSE_DROPDOWN:
            return Object.assign({}, state, {
                [action.dropdownId]: {
                    isOpen: false,
                    selection: state.selection
                }
            });
        default:
            return state
    }
};

export default itemCardReducer