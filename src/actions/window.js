import { receiveError } from "./common";

export const REQUEST_WINDOW = 'REQUEST_WINDOW';
export const RECEIVE_WINDOW = 'RECEIVE_WINDOW';
export const DISPLAY_WINDOW = 'DISPLAY_WINDOW';
export const RESET_DISPLAY_WINDOW = 'RESET_DISPLAY_WINDOW';

export const SELECT_WINDOW_SIZE = 'SELECT_WINDOW_SIZE';
export const SELECT_WINDOW_COLOR = 'SELECT_WINDOW_COLOR';

export function resetWindows() {
    return {
        type: RESET_DISPLAY_WINDOW,
    }
}

export function requestWindow(windowId) {
    return (dispatch, getState) => {
        dispatch(resetWindows());

        const state = getState();

        if (typeof state.windows === 'object' &&
            typeof state.windows[windowId] === 'object'
        ) {
            dispatch(displayWindow(windowId));
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/windows/' + windowId).then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveWindow(data, windowId));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400))
            });
        }
    };
}

export function displayWindow(windowId) {
    return {
        type: DISPLAY_WINDOW,
        windowId: windowId,
    }
}

export function receiveWindow(json, windowId) {
    return {
        type: RECEIVE_WINDOW,
        content: json,
        windowId: windowId,
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