export const REQUEST_HOME = 'REQUEST_HOME';
export const RECEIVE_HOME = 'RECEIVE_HOME';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';


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

let state = {
    selectedSubreddit: 'frontend',
    postsBySubreddit: {
    frontend: {
        isFetching: true,
        didInvalidate: false,
        items: []
    },
    reactjs: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1439478405547,
        home: [
            {
                id: 42,
                title: 'Confusion about Flux and Relay'
            },
            {
                id: 500,
                title: 'Creating a Simple Application Using React JS and Flux Architecture'
            }
        ]
    }
    }
};