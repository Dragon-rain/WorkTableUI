import thunkMiddleware from "redux-thunk";
import contentReducer from './content-reducer';
import profileReducer from './profile-reducer';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import messageReducer from './message-reducer'
const { createStore, combineReducers, applyMiddleware } = require("redux");



let redusers = combineReducers({
    contentPage: contentReducer,
    profile: profileReducer, 
    app: appReducer,
    form: formReducer,
    message: messageReducer

})

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;