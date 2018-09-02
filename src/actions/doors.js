export const RECEIVE_DOORS = 'RECEIVE_DOORS';
export const DISPLAY_DOORS = 'DISPLAY_DOORS';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

import { receiveError } from "./common";

export function displayDoors() {
    return {
        type: DISPLAY_DOORS,
    }
}

export function receiveDoors(json) {
    return {
        type: RECEIVE_DOORS,
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

export function requestDoors() {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.doorsUpdated === 'number') {
            dispatch(displayDoors());
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/doors/').then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveDoors(data));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}