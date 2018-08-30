import { combineReducers } from 'redux'
import counterReducer from './counter'
import homeReducer from './home'
import doorsReducer from "./doors";
import doorReducer from "./door";

const rootReducer = combineReducers({
    count: counterReducer,
    home: homeReducer,
    doors: doorsReducer,
    door: doorReducer,
});

export default rootReducer