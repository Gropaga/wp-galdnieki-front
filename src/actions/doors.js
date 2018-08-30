export const REQUEST_DOORS = 'REQUEST_DOORS';
export const RECEIVE_DOORS = 'RECEIVE_DOORS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

export function requestDoors(language) {
    return {
        type: REQUEST_DOORS,
        language: language
    }
}

export function receiveDoors(json) {
    return {
        type: RECEIVE_DOORS,
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