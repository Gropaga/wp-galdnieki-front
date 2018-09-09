import homeReducer from './home'
import doorsReducer from "./doors";
import doorReducer from "./door";
import commonReducer from "./common";
import customCombineReducers from './customCombineReducers'
import stairsReducer from "./stairs";
import windowsReducer from "./windows";
import windowReducer from "./window";

const rootReducer = customCombineReducers([
    homeReducer,
    doorsReducer,
    doorReducer,
    commonReducer,
    stairsReducer,
    windowsReducer,
    windowReducer,
]);

export default rootReducer