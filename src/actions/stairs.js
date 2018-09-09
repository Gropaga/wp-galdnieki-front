export const RECEIVE_STAIRS = 'RECEIVE_STAIRS';
export const DISPLAY_STAIRS = 'DISPLAY_STAIRS';

import { receiveError } from "./common";

export function displayStairs() {
    return {
        type: DISPLAY_STAIRS,
    }
}

export function receiveStairs(json) {
    return {
        type: RECEIVE_STAIRS,
        content: json,
        receivedAt: Date.now()
    }
}

export function requestStairs() {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.stairsUpdated === 'number') {
            dispatch(displayStairs());
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/stairs/').then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveStairs(data));
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}