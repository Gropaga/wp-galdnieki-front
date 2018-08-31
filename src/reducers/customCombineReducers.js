export default function (reducers) {
    return (state, action) => {
        return Object.keys(reducers).reduce((newState, key) => {
            return {
                ...newState,
                [key]: reducers[key](state, action)
            }
        }, state);
    }
};