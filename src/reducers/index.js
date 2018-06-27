import { combineReducers } from 'redux'
import counterReducer from './counter'
import homeReducer from './home'

const rootReducer = combineReducers({
    count: counterReducer,
    home: homeReducer
});

export default rootReducer