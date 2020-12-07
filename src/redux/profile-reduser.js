import { stopSubmit } from "redux-form";
import { ProfileAPI } from "../api/api";
import Cookies from 'js-cookie'

const SET_USER_DATA = 'profile/SET_USER_DATA';
const GET_CAPTCHA_URL = 'profile/GET_CAPTCHA_URL'

let initialState = {
    userId: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    age: null,
    gender: null,
    isAuth: false,
    captchaUrl: null
}

const ProfileReduser = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (userId, username, firstName, lastName, age, gender, isAuth) => (
    {type: SET_USER_DATA, payload: {userId, username, firstName, lastName, age, gender, isAuth}}
)
export const GetCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}})

export const getUserData = (username) => async (dispatch) => {
    const response = await ProfileAPI.getUser(username)
    if(response.data.resultCode === 0) {
        let user = response.data.user;
        dispatch(setUserData(user.id, user.username, user.firstName, user.lastName, user.age, user.gender, true))
    }
           
}

export const login = (username, password, captcha) => async (dispatch) => { 
    const response = await ProfileAPI.login(username, password, captcha);
    if(response.data.resultCode === 0) {
        Cookies.set("token", response.data.token);
        Cookies.set("username", response.data.user.username)
        dispatch(getUserData(response.data.user.username));
    }
}

export const registration = (username, password, firstName, lastName, age, gender) => async (dispath) => {
    const response = await ProfileAPI.registration(username, password, firstName, lastName, age, gender);
    if(response.data.resultCode === 0) {
        Cookies.set("token", response.data.token);
        Cookies.set("username", response.data.user.username)
        dispath(getUserData(response.data.user.username))
    }
}

export const Logout = () => async (dispatch) => {
    Cookies.remove("token");
    Cookies.remove("username");
    dispatch(setUserData(null, null, null, null, null, null, null, false)); 
    
    
}

export const GetCaptchaUrl = () => async (dispatch) => {
    
}

export default ProfileReduser;
