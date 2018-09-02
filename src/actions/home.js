export const RECEIVE_HOME = 'RECEIVE_HOME';
export const DISPLAY_HOME = 'DISPLAY_HOME';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

import { receiveError } from "./common";

export function displayHome() {
    return {
        type: DISPLAY_HOME,
    }
}

export function receiveHome(json) {
    return {
        type: RECEIVE_HOME,
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

export function requestHome() {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.homeUpdate === 'number') {
            dispatch(displayHome());
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/home/').then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveHome(data));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}