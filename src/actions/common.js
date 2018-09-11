export const DISPLAY_DATA = 'DISPLAY_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export function receiveError(text, number) {
    return {
        type: RECEIVE_ERROR,
        text: text,
        number: number,
        receivedAt: Date.now()
    }
}

export function displayData(section) {
    return {
        type: DISPLAY_DATA,
        section: section
    }
}

export function receiveData(section, content) {
    return {
        type: RECEIVE_DATA,
        section: section,
        content: content,
        receivedAt: Date.now()
    }
}

export function requestData(section, endpoint) {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.stairsUpdated === 'number') {
            dispatch(displayData(section));
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1' + concatEndpoint(endpoint)).then((response) => {
                return response.json();
            }).then((content) => {
                dispatch(receiveData(section, content));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}

const concatEndpoint = path => {
    return (Array.isArray(path) ? path : [path]).reduce((acc, part)=> {
        return part ? `${acc}/${part}` : acc;
    }, "");
};
