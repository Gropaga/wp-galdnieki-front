export const REQUEST_DOOR = 'REQUEST_DOOR';
export const RECEIVE_DOOR = 'RECEIVE_DOOR';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const FETCHING_TOGGLE_DOOR = 'FETCHING_TOGGLE_DOOR';
export const DISPLAY_DOOR = 'DISPLAY_DOOR';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

export function fetchingToggle(isFetching = true) {
    return {
        type: FETCHING_TOGGLE_DOOR,
        isFetching
    }
}

export function requestDoor(doorId) {
    return (dispatch, getState) => {
        dispatch(fetchingToggle());

        const state = getState().door;

        if (typeof state.doors === 'object' &&
            typeof state.doors[doorId] === 'object' &&
            typeof state.doors[doorId].updated === 'number'
        ) {
            dispatch(displayDoor(doorId));
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/doors/' + doorId).then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveDoor(data, doorId));
            });
        }
    };
}

export function displayDoor(doorId) {
    return {
        type: DISPLAY_DOOR,
        doorId: doorId,
    }
}

export function receiveDoor(json, doorId) {
    return {
        type: RECEIVE_DOOR,
        content: json,
        doorId: doorId,
        receivedAt: Date.now()
    }
}

export function receiveError(json) {
    return {
        type: RECEIVE_ERROR,
        content: json,
        receivedAt: Date.now()
    }
}

export function selectDimensions(doorId, dimensions) {
    return {
        type: SELECT_DOOR_SIZE,
        doorId: doorId,
        ...JSON.parse(dimensions)
    }
}

export function selectColor(doorId, colorIndex) {
    return {
        type: SELECT_DOOR_COLOR,
        doorId: doorId,
        colorIndex: colorIndex
    }
}