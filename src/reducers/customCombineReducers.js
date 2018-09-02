export default function (reducers) {
    return (state, action) => {
        return reducers.reduce((newState, reducer) => {
            return Object.assign(
                {},
                newState,
                reducer(newState, action)
            );
        }, state);
    }
};