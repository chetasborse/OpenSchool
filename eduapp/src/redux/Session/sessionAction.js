import axios from "axios"
import { ADD_PENDING_SESSION, SET_MEETING_URL, SET_PAST_SESSIONS, SET_PENDING_REQUESTS, SET_UPCOMING_SESSIONS } from "./sessionTypes"


export const fetch_home = (id, is_teacher, dispatch) => {
    return (dispatch) => {
        axios.get("http://localhost:5000/session/pending_requests", {
            params : {
                user_id: id
            }
        })
        .then((response) => {
            dispatch(set_pending(response.data))
        })
        .catch((err) => {
            console.log(err.message)
        })
        if(is_teacher) {
            axios.get("http://localhost:5000/session/upcoming_sessions_teachers", {
                params : {
                    user_id: id,
                }
            })
            .then((response) => {
                dispatch(set_upcoming(response.data))
            })
            .catch((err) => {
                console.log(err.message)
                console.log("lmao noob")
            })
            axios.get("http://localhost:5000/session/past_sessions_teachers", {
                params : {
                    user_id: id,
                }
            })
            .then((response) => {
                dispatch(set_past(response.data))
            })
            .catch((err) => {
                console.log(err.message)
            })
        } 
        else {
            axios.get("http://localhost:5000/session/upcoming_sessions_students", {
                params : {
                    user_id: id,
                }
            })
            .then((response) => {
                dispatch(set_upcoming(response.data))
            })
            .catch((err) => {
                console.log(err.message)
                console.log("lmao noob")
            })
            axios.get("http://localhost:5000/session/past_sessions_students", {
                params : {
                    user_id: id,
                }
            })
            .then((response) => {
                dispatch(set_past(response.data))
            })
            .catch((err) => {
                console.log(err.message)
            })
        } 
    }
}

export const send_request = (data, dispatch) => {
    return(dispatch) => {
        var body = data
        axios.post("http://localhost:5000/session/request", body)
        .then((response) => {
            dispatch(add_pending(body))
            alert("Request sent successfully")
        })
        .catch(err => {
            console.log(err.message)
        })
    }
}

export const set_meeting_url = (value) => {
    return {
        type: SET_MEETING_URL,
        payload: value
    }
}

export const set_upcoming = (value) => {
    return {
        type: SET_UPCOMING_SESSIONS,
        payload: value
    }
}

export const set_pending = (value) => {
    return {
        type: SET_PENDING_REQUESTS,
        payload: value
    }
}

export const add_pending = (value) => {
    return {
        type:ADD_PENDING_SESSION,
        payload: value
    }
}

export const set_past = (value) => {
    return {
        type: SET_PAST_SESSIONS,
        payload: value
    }
}
