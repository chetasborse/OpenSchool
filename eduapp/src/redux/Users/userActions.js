import { ADD_LANGUAGE, ADD_SUBJECT, DELETE_LANGUAGE, DELETE_SUBJECT, ERROR, GET_LANGUAGE, GET_STUDENT, GET_SUBJECT, GET_TEACHER, SET_ALL_LANG, SET_ALL_SUB ,LOGIN, LOGOUT, SET_LOGIN } from "./userTypes"
import axios from 'axios'

export const checkUser = (dispatch) => {
    return (dispatch) => {
        axios.get("http://localhost:5000/users/login")
        .then((response) => {
            if(response.data.loggedIn === true) {
                dispatch(login(response.data.user[0]))
                //console.log(response.data.user[0].user_type)
                
                if(response.data.user[0].user_type == 0) {
                    axios.get("http://localhost:5000/users/student", {
                        params: {
                            id: response.data.user[0].user_id
                        }
                    })
                    .then((resp) => {
                        dispatch(getstudent(resp.data[0]))
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                    axios.get("http://localhost:5000/users/student_subjects", {
                        params: {
                            id:response.data.user[0].user_id
                        }
                    })
                    .then((resp) => {
                        dispatch(getsubject(resp.data))
                        //console.log(resp.data)
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                }
                else {
                    axios.get("http://localhost:5000/users/teacher", {
                        params: {
                            id: response.data.user[0].user_id
                        }
                    })
                    .then((resp) => {
                        dispatch(getteacher(resp.data[0]))
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                    axios.get("http://localhost:5000/users/teacher_subjects", {
                        params: {
                            id:response.data.user[0].user_id
                        }
                    })
                    .then((resp) => {
                        dispatch(getsubject(resp.data))
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                    axios.get("http://localhost:5000/users/languages", {
                        params: {
                            id:response.data.user[0].user_id
                        }
                    })
                    .then((resp) => {
                        dispatch(getlanguage(resp.data))
                    })
                    .catch((err)=> {
                        console.log(err)
                    })
                }
            }
            else {
                dispatch(logout)
            }
        })
        .catch(error => {
            dispatch(err(error))
        })
        axios.get("http://localhost:5000/users/all_subjects")
        .then((response) => {
            // set_subs(response.data)
            dispatch(set_all_subs(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
        axios.get("http://localhost:5000/users/all_languages")
        .then((response) => {
            dispatch(set_all_langs(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
}

export const getSubject = (user_id, user_type, sub, dispatch) => {
    return (dispatch) => {
        var body = {
            user_id: user_id,
            subject_id: sub.id
        }
        
        if(user_type) {
            axios.post("http://localhost:5000/users/add_teacher_subject", body)
            .then(res => {
                console.log(res)
                dispatch(addSubject({subject_id: sub.id, subject_name: sub.sub}))
            })
            .catch((err)=> {
                console.log(err.message)
            })
        }
        else {
            axios.post("http://localhost:5000/users/add_student_subject", body)
            .then(res => {
                console.log(res)
                dispatch(addSubject({subject_id: sub.id, subject_name: sub.sub}))
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
}

export const getLanguage = (user_id, lang, dispatch) => {
    return (dispatch) => {
        var body = {
            user_id: user_id,
            language_id: lang.id
        }
        axios.post("http://localhost:5000/users/add_language", body)
        .then(res => {
            console.log(res)
            dispatch(addLanguage({language_id: lang.id, language_name: lang.lang}))
        })
        .catch((err)=> {
            console.log(err)
        })
    }
}


export const removeSubject = (user_id, user_type, sub, dispatch) => {
    return (dispatch) => {
        var body = {
            user_id: user_id,
            subject_id: sub
        }
        
        if(user_type) {
            axios.post("http://localhost:5000/users/del_teacher_subject", body)
            .then(res => {
                console.log(res)
                dispatch(deleteSubject({subject_id: sub}))
            })
            .catch((err)=> {
                console.log(err.message)
            })
        }
        else {
            axios.post("http://localhost:5000/users/del_student_subject", body)
            .then(res => {
                console.log(res)
                dispatch(deleteSubject({subject_id: sub}))
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
}

export const removeLanguage = (user_id, lang, dispatch) => {
    return (dispatch) => {
        var body = {
            user_id: user_id,
            language_id: lang
        }
        axios.post("http://localhost:5000/users/del_language", body)
        .then(res => {
            console.log(res)
            dispatch(deleteLanguage({language_id: lang}))
        })
        .catch((err)=> {
            console.log(err)
        })
    }
}

export const set_all_langs = (value) => {
    return {
        type: SET_ALL_LANG,
        payload:value
    }
}

export const set_all_subs = (value) => {
    return {
        type: SET_ALL_SUB,
        payload:value
    }
}


export const login = (value) => {
    return {
        type: LOGIN,
        payload: value
    }
}

export const getstudent = (value) => {
    return {
        type: GET_STUDENT,
        payload: value
    }
}

export const getteacher = (value) => {
    return {
        type: GET_TEACHER,
        payload: value
    }
}

export const getsubject = (value) => {
    return {
        type: GET_SUBJECT,
        payload: value
    }
}

export const getlanguage = (value) => {
    return {
        type: GET_LANGUAGE,
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

export const addSubject = (value) => {
    return {
        type: ADD_SUBJECT,
        payload: value
    }
}

export const addLanguage = (value) => {
    return {
        type: ADD_LANGUAGE,
        payload: value
    }
}

export const deleteSubject = (value) => {
    return {
        type: DELETE_SUBJECT,
        payload: value
    }
}

export const deleteLanguage = (value) => {
    return {
        type: DELETE_LANGUAGE,
        payload: value
    }
}