import { RECEIVE_HOME, SELECT_DOOR_SIZE, SELECT_DOOR_COLOR, DISPLAY_HOME} from '../actions/home'

const initState = {
    isFetching: true,
    doors: [],
    jumbo: {},
    landingImage: null
};

const homeReducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case DISPLAY_HOME:
            return {
                ...state,
                isFetching: false
            };
        case RECEIVE_HOME:
            return {
                ...state,
                doors: [
                    ...action.content.doors,
                    ...state.doors
                ],
                jumbo: action.content.jumbo,
                landingImage: action.content.landingImage,
                ...action.content,
                isFetching: false,
                homeUpdate: action.receivedAt,
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

export default homeReducer