export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export function receiveError(text, number) {
    return {
        type: RECEIVE_ERROR,
        text: text,
        number: number,
        receivedAt: Date.now()
    }
}