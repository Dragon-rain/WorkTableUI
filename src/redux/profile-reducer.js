import { AuthAPI } from "../api/api";
import { encriptFormData } from "../utils/encryptors/encriptors";
import { cookiesRemoveTokenAndUsername, cookiesSetTokenAndUsername } from '../utils/cookiesData/cookiesData';
import { stopSubmit } from "redux-form";

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

const ProfileReducer = (state = initialState, action) => {
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
    const response = await AuthAPI.getUser(username)
    if(response.data.resultCode === 0) {
        let user = response.data.user;
        dispatch(setUserData(user.id, user.username, user.firstName, user.lastName, user.age, user.gender, true))
    }
           
}

export const login = (username, password, captcha) => async (dispatch) => {
    let encrypted = encriptFormData(password);
    const response = await AuthAPI.login(username, encrypted, captcha);
    console.log(response);
    if(response.data.resultCode === 0) {
        cookiesSetTokenAndUsername(response.data.token, response.data.user.username);
        dispatch(getUserData(response.data.user.username));
    } else {
        let message = response.data.message ? response.data.message : "Some error";
        dispatch(stopSubmit('login', { _error: message }));
        return Promise.reject(response.data.message);
    }
}

export const registration = (username, password, firstName, lastName, age, gender) => async (dispatch) => {
    let encrypted = encriptFormData(password);
    const response = await AuthAPI.registration(username, encrypted, firstName, lastName, age, gender);
    if(response.data.resultCode === 0) {
        cookiesSetTokenAndUsername(response.data.token, response.data.user.username);
        dispatch(getUserData(response.data.user.username))
    } else {
        let message = response.data.message ? response.data.message : "Some error";
        dispatch(stopSubmit('RegistrationForm', { _error: message }));
        return Promise.reject(response.data.message);
    }
}

export const Logout = () => async (dispatch) => {
    cookiesRemoveTokenAndUsername("token", "username")
    dispatch(setUserData(null, null, null, null, null, null, null, false)); 
    
    
}

export const GetCaptchaUrl = () => async (dispatch) => {
    
}

export default ProfileReducer;
