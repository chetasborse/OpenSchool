import axios from 'axios'
import {SET_TEACHERS, SET_STUDENTS, SET_VERIFIED} from './adminTypes'

export const fetchAllUsers = (dispatch) => {
    return(dispatch) => {
        axios.get('http://localhost:5000/users/get_all_teachers')
        .then((response) => {
            dispatch(setTeachers(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
        axios.get('http://localhost:5000/users/get_all_students')
        .then((response) => {
            dispatch(setStudents(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })   
    }
}

export const setTeachers = (value) => {
    return {
        type: SET_TEACHERS,
        payload: value
        
    }
}

export const setStudents = (value) => {
    return {
        type: SET_STUDENTS,
        payload: value
    }
}

export const verifyTeacher = (value) => {
    return {
        type: SET_VERIFIED,
        payload: value
    }
}