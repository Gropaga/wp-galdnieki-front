import { receiveError } from "./common";

export const REQUEST_INTERIOR = 'REQUEST_INTERIOR';
export const RECEIVE_INTERIOR = 'RECEIVE_INTERIOR';
export const DISPLAY_INTERIOR = 'DISPLAY_INTERIOR';
export const RESET_DISPLAY_INTERIOR = 'RESET_DISPLAY_INTERIOR';

export const SELECT_INTERIOR_SIZE = 'SELECT_INTERIOR_SIZE';
export const SELECT_INTERIOR_COLOR = 'SELECT_INTERIOR_COLOR';

export function resetWindows() {
    return {
        type: RESET_DISPLAY_INTERIOR,
    }
}

export function requestWindow(interiorId) {
    return (dispatch, getState) => {
        dispatch(resetWindows());

        const state = getState();

        if (typeof state.interiors === 'object' &&
            typeof state.interiors[interiorId] === 'object'
        ) {
            dispatch(displayWindow(interiorId));
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/interiors/' + interiorId).then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveWindow(data, interiorId));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400))
            });
        }
    };
}

export function displayWindow(interiorId) {
    return {
        type: DISPLAY_INTERIOR,
        interiorId: interiorId,
    }
}

export function receiveWindow(json, interiorId) {
    return {
        type: RECEIVE_INTERIOR,
        content: json,
        interiorId: interiorId,
        receivedAt: Date.now()
    }
}

export function selectDimensions(interiorId, dimensions) {
    return {
        type: SELECT_INTERIOR_SIZE,
        interiorId: interiorId,
        ...JSON.parse(dimensions)
    }
}

export function selectColor(interiorId, colorIndex) {
    return {
        type: SELECT_INTERIOR_COLOR,
        interiorId: interiorId,
        colorIndex: colorIndex
    }
}