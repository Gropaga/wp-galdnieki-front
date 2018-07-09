export const REQUEST_HOME = 'REQUEST_HOME';
export const RECEIVE_HOME = 'RECEIVE_HOME';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

export function requestHome(language) {
    return {
        type: REQUEST_HOME,
        language: language
    }
}

export function receiveHome(json) {
    return {
        type: RECEIVE_HOME,
        content: json,
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