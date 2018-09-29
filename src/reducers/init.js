const initState = {
    isFetching: true,
    allLoaded: {},
    doors: [],
    stairs: [],
    contacts: [],
    interiors: [],
    windows: [],
};

const initReducer = (state = { ...initState }) => {
    return state
};

export default initReducer