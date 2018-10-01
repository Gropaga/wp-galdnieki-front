import commonReducer from "./common";
import initReducer from "./init";
import customCombineReducers from './customCombineReducers'

const rootReducer = customCombineReducers([
    initReducer,
    commonReducer,
]);

export default rootReducer