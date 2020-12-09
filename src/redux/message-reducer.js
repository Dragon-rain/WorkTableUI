const SET_MESSAGE = 'content/SET_MESSAGE'

let initialState = {
        message: null

}

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MESSAGE:
            return {...state, ...action.payload};

        default:
            return state;
    }
}

export const setMessage = (message) => ({type: SET_MESSAGE, payload: {message}})


export default messageReducer;