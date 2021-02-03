import { ERROR, LOGIN, LOGOUT, SET_LOGIN } from "./userTypes"
import axios from 'axios'

export const checkUser = (dispatch) => {
    return (dispatch) => {
        axios.get("http://localhost:5000/users/login")
        .then((response) => {
            if(response.data.loggedIn === true) {
                dispatch(login(response.data.user[0]))
            }
            else {
                dispatch(logout)
            }
        })
        .catch(error => {
            dispatch(err(error))
        })
    }
}

export const login = (value) => {
    return {
        type: LOGIN,
        payload: value
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const err = (error) => {
    return {
        type: ERROR,
        payload: error.message
    }
}

export const setLogin = () => {
    return {
        type: SET_LOGIN
    }
}