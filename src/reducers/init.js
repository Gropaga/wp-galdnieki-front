const initState = {
    isFetching: true,
    allLoaded: {},
    doors: [],
    stairs: [],
    kitchens: [],
    contacts: [],
    interiors: [],
    windows: [],
};

// contains initial data
const initReducer = (state = { ...initState }) => {
    return state
};

export default initReducer