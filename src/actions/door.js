import { receiveError } from "./common";

export const REQUEST_DOOR = 'REQUEST_DOOR';
export const RECEIVE_DOOR = 'RECEIVE_DOOR';
export const DISPLAY_DOOR = 'DISPLAY_DOOR';
export const RESET_DISPLAY_DOOR = 'RESET_DISPLAY_DOOR';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

export function resetDoors() {
    return {
        type: RESET_DISPLAY_DOOR,
    }
}

export function requestDoor(doorId) {
    return (dispatch, getState) => {
        dispatch(resetDoors());

        const state = getState();

        console.log(state.doors[doorId], doorId, state.doors[doorId]);

        if (typeof state.doors === 'object' &&
            typeof state.doors[doorId] === 'object'
        ) {
            dispatch(displayDoor(doorId));
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/doors/' + doorId).then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveDoor(data, doorId));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400))
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