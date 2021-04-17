import { getUserData } from './profile-reducer'
import Cookies from 'js-cookie'

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCES:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSucces = () => ({type: INITIALIZED_SUCCES})

export const initializeApp = () => (dispatch) => {
        let username = Cookies.get('username');
        if(!username) {
            dispatch(initializedSucces());
        }
        let promise = dispatch(getUserData(username))
        promise.then(() => {
            dispatch(initializedSucces())
        });
      
}

export default appReducer;
