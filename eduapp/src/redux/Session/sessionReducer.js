import { ADD_PENDING_SESSION, SET_PAST_SESSIONS, SET_PENDING_REQUESTS, SET_UPCOMING_SESSIONS } from "./sessionTypes"

const sessions_initial_State = {
    upcoming_sessions: [],
    pending_requests: [],
    past_sessions: [],
}

const sessionReducer = (state = sessions_initial_State, action) => {
    switch(action.type) {
        case SET_UPCOMING_SESSIONS: return {
            ...state,
            upcoming_sessions: action.payload
        }
        case SET_PENDING_REQUESTS: return {
            ...state,
            pending_requests: action.payload
        }
        case SET_PAST_SESSIONS: return {
            ...state,
            past_sessions: action.payload
        }
        case ADD_PENDING_SESSION: return {
            ...state,
            pending_requests: [...state.pending_requests, action.payload]
        }
        default: return state
    }
}

export default sessionReducer