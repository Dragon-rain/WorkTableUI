import { ContentAPI } from "../api/api";

const ADD_POST = 'content/ADD-POST';
const SET_POSTS ='content/SET_USERS';
const SET_CURRENT_PAGE ='content/SET_CURRENT_PAGE';
const SET_TOTAL_POSTS_COUNT = 'content/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'content/TOGGLE_IS_FETCHING';
const SET_MESSAGE = 'content/SET_MESSAGE'

let initialState = {
        posts: [],
        pageSize: 10,
        totalPostsCount: 0,
        currentPage: 1,
        isFetching: false,
        message: null

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

const contentReduser = (state = initialState, action) => {

    switch(action.type) {

        case ADD_POST: 
            return _addPost(state, action.newPost);

        case SET_CURRENT_PAGE: 
            return {...state, currentPage: action.currentPage};

        case SET_POSTS:
        case SET_TOTAL_POSTS_COUNT: 
        case TOGGLE_IS_FETCHING:
        case SET_MESSAGE:
            return {...state, ...action.payload};

        default:
            return state;
    }

}

export const addPostActionCreator = (newPost) => ({type: ADD_POST, payload: {newPost} });
export const setPosts = (posts) => ({type: SET_POSTS, payload: {posts}})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalPostsCount = (totalCount) => ({type: SET_TOTAL_POSTS_COUNT, payload: {totalCount}})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}})
export const setMessage = (message) => ({type: SET_MESSAGE, payload: {message}})

export const requestPosts = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage))
    const response = await ContentAPI.getAllPosts(currentPage, pageSize);
    if(response.data.resultCode === 0) {
        dispatch(toggleIsFetching(false));
        dispatch(setPosts(response.data.posts));
        dispatch(setTotalPostsCount(response.data.totalCount));
    } else {
        dispatch(setMessage(response.data.message));
    }
    
    
}


export default contentReduser;