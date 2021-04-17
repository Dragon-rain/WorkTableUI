import { AuthAPI, MainAPI, UserApi } from "../api/api";
import AuthFilter from "../utils/AuthFilter/AuthFilter";
import { setMessage } from './message-reducer'
import Cookies from 'js-cookie'

const ADD_POST = 'content/ADD-POST';
const SET_POSTS ='content/SET_USERS';
const SET_CURRENT_PAGE ='content/SET_CURRENT_PAGE';
const SET_TOTAL_POSTS_COUNT = 'content/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'content/TOGGLE_IS_FETCHING';
const SET_PICTURES = 'content/SET_PICTURES';

let initialState = {
    posts: [],
    pictures: [],
    pageSize: 10,
    totalPostsNumber: 0,
    currentPage: 1,
    isFetching: false
}

const _addPost = (state, text) => {
    let newPost = {
        id:  1,
        text: text,
    }

    let stateCopy = {
        ...state,
        posts: [...state.posts, newPost]
    };
    return stateCopy;
}

const contentReducer = (state = initialState, action) => {

    switch(action.type) {

        case ADD_POST: 
            return _addPost(state, action.newPost);

        case SET_CURRENT_PAGE: 
            return {...state, currentPage: action.currentPage};

        case SET_PICTURES: 
        case SET_POSTS:
        case SET_TOTAL_POSTS_COUNT: 
        case TOGGLE_IS_FETCHING:
            return {...state, ...action.payload};

        default:
            return state;

    }

}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, payload: {newPost} });
export const setPosts = (posts) => ({type: SET_POSTS, payload: {posts}});
export const setPictures = (pictures) => ({type: SET_PICTURES, payload: {pictures}});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalPostsCount = (totalPostsNumber) => ({type: SET_TOTAL_POSTS_COUNT, payload: {totalPostsNumber}});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}});

export const requestPosts = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage))
    const response = await MainAPI.getAllPosts(currentPage, pageSize);
    if(response.data.resultCode === 0) {
        dispatch(toggleIsFetching(false));
        dispatch(setPosts(response.data.posts));
        dispatch(setTotalPostsCount(response.data.totalPostsNumber));
    } else {
        dispatch(setMessage(response.data.message));
    }

}

export const addPost = (type, title, description, userId, files) => async (dispatch) => {
    const responsePost = await UserApi.postPost(type, title, description, userId, files).catch(async e => {
        console.log(e.response.status);
        if(e.response.status===403) {
            
            const username = Cookies.get("username")
            const response = await AuthAPI.refresh(username);
            AuthFilter(response);
            console.log(Cookies.get("token"))
            console.log("token refreshed")
            document.location.reload()
            
        }
    });
    const responsePicture = await UserApi.postPicture(files);


    if(responsePost.data.resultCode === 0 && responsePicture.data.resultCode === 0) {
        let currentPage, pageSize;
        dispatch(requestPosts(currentPage, pageSize));
    }

}







export default contentReducer;