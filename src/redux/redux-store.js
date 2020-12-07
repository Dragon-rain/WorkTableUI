import thunkMiddleware from "redux-thunk";
import contentReduser from './content-reducer';
import profileReduser from './profile-reduser';
import { reducer as formReducer } from 'redux-form'
import appReduser from "./app-reduser";
const { createStore, combineReducers, applyMiddleware } = require("redux");



let redusers = combineReducers({
    contentPage: contentReduser,
    profile: profileReduser, 
    app: appReduser,
    form: formReducer

})

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;