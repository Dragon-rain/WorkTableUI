import { AuthAPI, UserApi } from "../api/api";
import { encriptFormData } from "../utils/encryptors/encriptors";
import { cookiesRemove, cookiesSetData } from '../utils/cookiesData/cookiesData';
import { stopSubmit } from "redux-form";
import { getAge } from "../utils/utils";
import { requestPosts } from "./content-reducer";


const SET_USER_DATA = 'profile/SET_USER_DATA';
const GET_CAPTCHA_URL = 'profile/GET_CAPTCHA_URL';
const GET_USER_POSTS_COUNT = 'profile/GET_USER_POSTS_COUNT';

let initialState = {
    userId: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    age: null,
    gender: null,
    isAuth: false,
    profilePhoto: null,
    currentCity: null,
    captchaUrl: null,
    userPostsCount: null
}

const ProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
        case GET_USER_POSTS_COUNT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserData = (userId, username, firstName, lastName, age, gender, isAuth, profilePhoto, currentCity) => (
    {type: SET_USER_DATA, payload: {userId, username, firstName, lastName, age, gender, isAuth, profilePhoto, currentCity}}
)
export const GetCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}})
export const SetUserPostCount = (userPostsCount) => ({type: GET_USER_POSTS_COUNT, payload: {userPostsCount}})

export const getUserPostsCount = (userId) => async (dispatch) => {
    const response = await UserApi.userPostsCount(userId);
    if(response.data.resultCode === 0) {
        dispatch(SetUserPostCount(response.data.userPostsCount));
    }
}

export const getUserData = (username) => async (dispatch) => {
    const response = await AuthAPI.getUser(username);
    if(response.data.resultCode === 0) {
        let user = response.data.user;
        let age = getAge(user.dob);
        dispatch(setUserData(user.id, user.username, user.firstName, user.lastName, age, user.gender, true, response.data.profilePhoto, user.currentCity));
    }

}

export const changeProfilePicture = (userId, file) => async (dispatch) => {
    const response = await UserApi.addProfilePicture(userId, file)
    if(response.data.resultCode === 0) {
        dispatch(getUserData(response.data.username));
    }
}

export const login = (username, password, captcha) => async (dispatch) => {
    let encrypted = encriptFormData(password);
    const response = await AuthAPI.login(username, encrypted, captcha);
    if(response.data.resultCode === 0) {
        cookiesSetData(response.data.token, response.data.user.username, response.data.refreshToken);
        dispatch(getUserData(response.data.user.username));
        document.location.reload()
    } else {
        let message = response.data.message ? response.data.message : "Some error";
        dispatch(stopSubmit('login', { _error: message }));
        return Promise.reject(response.data.message);
    }
}

export const registration = (username, password, firstName, lastName, dob, gender, currentCity) => async (dispatch) => {
    let encrypted = encriptFormData(password);
    const response = await AuthAPI.registration(username, encrypted, firstName, lastName, dob, gender, currentCity);
    if(response.data.resultCode === 0) {
        cookiesSetData(response.data.token, response.data.user.username, response.data.refreshToken);
        dispatch(getUserData(response.data.user.username))
    } else {
        let message = response.data.message ? response.data.message : "Some error";
        dispatch(stopSubmit('registrationform', { _error: message }));
        return Promise.reject(response.data.message);
    }
}

export const Logout = () => (dispatch) => {
    AuthAPI.logout()
    cookiesRemove();
    dispatch(setUserData(null, null, null, null, null, null, null, false, null, null)); 
    dispatch(requestPosts())
}

export const GetCaptchaUrl = () => async (dispatch) => {
    
}

export default ProfileReducer;
