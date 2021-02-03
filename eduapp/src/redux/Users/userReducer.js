const { LOGIN, LOGOUT, ERROR, SET_LOGIN } = require("./userTypes")

const userInitialState = {
    loggedIn: false,
    username: '',
    password: '',
    error: ''
}

const userReducer = (state = userInitialState, action) => {
    switch(action.type) {
        case LOGIN: return {
            ...state,
            loggedIn: true,
            username: action.payload.username,
            password: action.payload.password,
            error: ''
        }
        case LOGOUT: return {
            loggedIn: false,
        }
        case ERROR: return {
            ...state,
            error: action.payload
        }
        case SET_LOGIN: return {
            loggedIn: true,
        }
        default: return state
    }
}

export default userReducer