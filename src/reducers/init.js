const initState = {
    isFetching: true,
    allLoaded: {},
    doors: [],
    stairs: [],
    contacts: [],
    interiors: [],
    windows: [],
    home: [],
    furniture: [],
};

// contains initial data
const initReducer = (state = { ...initState }) => {
    return state
};

export default initReducer