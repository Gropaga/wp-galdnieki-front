import homeReducer from './home';
import commonReducer from "./common";
import initReducer from "./init";
import customCombineReducers from './customCombineReducers'

const rootReducer = customCombineReducers([
    initReducer,
    homeReducer,
    commonReducer,
]);

export default rootReducer