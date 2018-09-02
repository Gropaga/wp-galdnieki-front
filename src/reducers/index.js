import homeReducer from './home'
import doorsReducer from "./doors";
import doorReducer from "./door";
import commonReducer from "./common";
import customCombineReducers from './customCombineReducers'

const rootReducer = customCombineReducers([
    homeReducer,
    doorsReducer,
    doorReducer,
    commonReducer,
]);

export default rootReducer