export const RECEIVE_WINDOWS = 'RECEIVE_WINDOWS';
export const DISPLAY_WINDOWS = 'DISPLAY_WINDOWS';

export const SELECT_WINDOW_SIZE = 'SELECT_WINDOW_SIZE';
export const SELECT_WINDOW_COLOR = 'SELECT_WINDOW_COLOR';

import { receiveError } from "./common";

export function displayWindows() {
    return {
        type: DISPLAY_WINDOWS,
    }
}

export function receiveWindows(json) {
    return {
        type: RECEIVE_WINDOWS,
        content: json,
        receivedAt: Date.now()
    }
}

export function selectDimensions(windowId, dimensions) {
    return {
        type: SELECT_WINDOW_SIZE,
        windowId: windowId,
        ...JSON.parse(dimensions)
    }
}

export function selectColor(windowId, colorIndex) {
    return {
        type: SELECT_WINDOW_COLOR,
        windowId: windowId,
        colorIndex: colorIndex
    }
}

export function requestWindows() {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.windowsUpdated === 'number') {
            dispatch(displayWindows());
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/windows/').then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveWindows(data));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}