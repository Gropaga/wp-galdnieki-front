import preload from "../../preload.json";

export const DISPLAY_DATA = 'DISPLAY_DATA';
export const DISPLAY_ALL_DATA = 'DISPLAY_ALL_DATA';
export const RECEIVE_ALL_DATA = 'RECEIVE_ALL_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_SIZE = 'SELECT_SIZE';
export const SELECT_COLOR = 'SELECT_COLOR';
export const RESET_DISPLAY = 'RESET_DISPLAY';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const START_RECEIVE_DATA = 'START_RECEIVE_DATA';

export function receiveError(text, number) {
    return {
        type: RECEIVE_ERROR,
        text: text,
        number: number,
        receivedAt: Date.now()
    }
}

export function resetDisplay(section) {
    return {
        type: RESET_DISPLAY,
        section: section
    }
}

export function startReceiveData(section) {
    return {
        type: START_RECEIVE_DATA,
        section: section,
    }
}

export function displayAllData(section) {
    return {
        type: DISPLAY_ALL_DATA,
        section: section
    }
}

export function displayData(section, itemId) {
    return {
        type: DISPLAY_DATA,
        section: section,
        itemId: itemId
    }
}

export function receiveData(section, content, itemId) {
    return {
        type: RECEIVE_DATA,
        content: content,
        itemId: itemId,
        receivedAt: Date.now()
    }
}

export function receiveAllData(section, content) {
    return {
        type: RECEIVE_ALL_DATA,
        page: section,
        content: content,
        receivedAt: Date.now()
    }
}

export function selectDimensions(section, itemId, dimensions) {
    return {
        type: SELECT_SIZE,
        section: section,
        itemId: itemId,
        ...JSON.parse(dimensions)
    }
}

export function selectColor(section, itemId, colorIndex) {
    return {
        type: SELECT_COLOR,
        section: section,
        itemId: itemId,
        colorIndex: colorIndex
    }
}

export function preloadData(excludeSection = false) {
    return (dispatch, getState) => {
        const state = getState();

        Object.entries(preload.sections).filter(([section, weight]) => {
            return section !== excludeSection;
        }).filter(([section, weight]) => { // weight is not used
            return state[section].loading !== false ||
                (state[section].loading === false && state.allLoaded[section] === undefined);
        }).map(([section, weight]) => { // weight is not used
            dispatch(startReceiveData(section));
            fetch(`${RESOURCE_URL}${section}`).then((response) => {
                return response.json();
            }).then((content) => {
                dispatch(receiveAllData(section, content));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        });
    }
}

export function requestAllData(section) {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.allLoaded[section] === 'number') {
            dispatch(displayAllData(section));
        } else if (typeof state[section] === 'undefined' || state[section].loading !== true) {
            dispatch(startReceiveData(section));
            fetch(`http://localhost:8080/wp-json/shop/v1/${section}`).then((response) => {
                return response.json();
            }).then((content) => {
                dispatch(receiveAllData(section, content));
                dispatch(preloadData(section));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}

export function requestData(section, itemId) {
    return (dispatch, getState) => {
        dispatch(startReceiveData(section));
        dispatch(resetDisplay(section));

        const state = getState();

        if (typeof state[section] === 'object' &&
            typeof state[section][itemId] === 'object'
        ) {
            dispatch(displayData(section, itemId));
        } else {
            fetch(`http://localhost:8080/wp-json/shop/v1/${section}/${itemId}`).then((response) => {
                return response.json();
            }).then((content) => {
                dispatch(receiveData(section, content, itemId));
                dispatch(preloadData());
            }).catch((err) => {
                console.trace('ERROR:', err);
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}