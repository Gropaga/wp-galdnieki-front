import counterReducer from './counter'
import homeReducer from './home'
import doorsReducer from "./doors";
import doorReducer from "./door";
import customCombineReducers from './customCombineReducers'

const rootReducer = customCombineReducers({
    count: counterReducer,
    home: homeReducer,
    doors: doorsReducer,
    door: doorReducer,
});

export default rootReducer