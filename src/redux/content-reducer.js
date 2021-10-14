import { MainAPI, UserApi } from "../api/api";
import { setMessage } from './message-reducer'

const ADD_POST = 'content/ADD-POST';
const SET_POSTS ='content/SET_USERS';
const SET_CURRENT_PAGE ='content/SET_CURRENT_PAGE';
const SET_TOTAL_POSTS_COUNT = 'content/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'content/TOGGLE_IS_FETCHING';
const SET_PICTURES = 'content/SET_PICTURES';
const SET_CITY_LIST = 'content/SET_CITY_LIST';
const SET_DISTRICTS_LIST = 'content/SET_DISTRICTS_LIST';
const SET_KEYWORD = 'content/SET_KEYWORD';
const SET_TYPE = 'content/SET_TYPE';
const SET_CITYID = 'content/SET_CITYID';
const SET_DISTRICTID = 'content/SET_DISTRICTID';
const SET_POST = 'content/SET_POST';
const EDITED_POST = 'content/EDITED_POST'

let initialState = {
    posts: [],
    pictures: [],
    pageSize: 10,
    totalPostsNumber: 0,
    currentPage: 1,
    isFetching: false,
    cityList: [],
    districtsList: [],
    keyword: "null",
    type: "null",
    cityId: "null",
    districtId: "null",
    post: []
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
        case EDITED_POST:
            return {...state, post: {...state.post, ...action.payload.post}}
        case SET_PICTURES: 
        case SET_POSTS:
        case SET_TOTAL_POSTS_COUNT: 
        case TOGGLE_IS_FETCHING:
        case SET_CITY_LIST:
        case SET_DISTRICTS_LIST:
        case SET_KEYWORD:
        case SET_TYPE:
        case SET_CITYID:
        case SET_DISTRICTID:
        case SET_POST:
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
export const setCityList = (cityList) => ({type: SET_CITY_LIST, payload: {cityList}});
export const setDistrictsList = (districtsList) => ({type: SET_DISTRICTS_LIST, payload: {districtsList}});
export const setKeyword = (keyword) => ({type: SET_KEYWORD, payload: {keyword}});
export const setType = (type) => ({type: SET_TYPE, payload: {type}});
export const setCityId = (cityId) => ({type: SET_CITYID, payload: {cityId}});
export const setDistrictId = (districtId) => ({type: SET_DISTRICTID, payload: {districtId}});
export const setPost = (post) => ({type: SET_POST, payload: {post}})
export const editedPost = (post) => ({type: EDITED_POST, payload: {post}})

export const requestPosts = (currentPage, pageSize, keyword, type, cityId, districtId, username) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage))
    const response = await MainAPI.getAllPosts(currentPage, pageSize, keyword, type, cityId, districtId, username);
    if(response.data.resultCode === 0) {
        dispatch(toggleIsFetching(false));
        dispatch(setPosts(response.data.posts));
        dispatch(setTotalPostsCount(response.data.totalPostsNumber));
        dispatch(setMessage(null))
    } else {
        dispatch(setMessage(response.data.message));
    }

}

export const addPost = (type, title, description, userId, cityId, districtId, files) => async (dispatch) => {
    const response = await UserApi.postPost(type, title, description, userId, cityId, districtId, files)
    if(response.data.resultCode === 0) {
        let currentPage, pageSize;
        dispatch(requestPosts(currentPage, pageSize));
    }

}

export const getCityList = () => async (dispatch) => {
    const response = await MainAPI.getCityList();
    if(response.data.resultCode === 0) {
        dispatch(setCityList(response.data.cityList));
    }
    return Promise.resolve(response.data.cityList)
}

export const getDistrictsList = () => async (dispatch) => {
    const response = await MainAPI.getDistrictsList();
    if(response.data.resultCode === 0) {
        dispatch(setDistrictsList(response.data.districtsList));
    }
    return Promise.resolve(response.data.districtsList)
}

export const getPostById = (id) => async (dispatch) => {
    const response = await MainAPI.findPostById(id);
    if(response.data.resultCode === 0) {
        dispatch(setPost(response.data.post))
    }
}

export const saveEditedPost = (newPost, newFiles) => async (dispatch) => {
    let post = JSON.stringify({
        'id': newPost.id, 
        'title': newPost.title,
        'description': newPost.description, 
        'type': newPost.type, 
        'cityId': newPost.cityId, 
        'districtId': newPost.districtId,
    })
    const response = await UserApi.editPost(post, newFiles)
    if(response.data.resultCode === 0) {
        dispatch(editedPost(newPost))
    }
}

export const deletePost = (postId) => async (dispatch) => {
    await UserApi.deletePost(postId)
}








export default contentReducer;