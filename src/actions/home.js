export const RECEIVE_HOME = 'RECEIVE_HOME';
export const DISPLAY_HOME = 'DISPLAY_HOME';

export const SELECT_DOOR_SIZE = 'SELECT_DOOR_SIZE';
export const SELECT_DOOR_COLOR = 'SELECT_DOOR_COLOR';

import {preloadData, receiveError} from "./common";

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

export function requestHome() {
    return (dispatch, getState) => {
        const state = getState();

        if (typeof state.homeUpdated === 'number') {
            dispatch(displayHome());
        } else {
            fetch('http://localhost:8080/wp-json/shop/v1/home/').then((response) => {
                return response.json();
            }).then((data) => {
                dispatch(receiveHome(data));
                dispatch(preloadData('home'))
            }).catch(() => {
                dispatch(receiveError('Web page error', 400));
            });
        }
    };
}