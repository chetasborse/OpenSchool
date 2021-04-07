const { LOGIN, LOGOUT, ERROR, SET_LOGIN, GET_TEACHER, GET_STUDENT, GET_LANGUAGE, GET_SUBJECT, ADD_LANGUAGE, ADD_SUBJECT, DELETE_SUBJECT, DELETE_LANGUAGE, SET_ALL_LANG, SET_ALL_SUB, GET_ADMIN } = require("./userTypes")

const userInitialState = {
    loggedIn: false,
    username: '',
    password: '',
    user_id: -1,
    first_name: '',
    last_name: '',
    is_teacher: '',
    image_link: '',
    email_id: '',
    session_taken: 0,
    grade: 0,
    board: '',
    qualification: '',
    rating_points: 0,
    error: '',
    subjects: [],
    languages: [],
    all_subjects: [],
    all_languages: [],
    is_admin: false,
    verfied: 0,
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
        case GET_TEACHER: return {
            ...state,
            user_id: action.payload.user_id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email_id: action.payload.email_id,
            image_link: action.payload.image_link,
            qualification: action.payload.qualification,
            rating_points: action.payload.rating_points,
            session_taken: action.payload.sessions_taken,
            is_teacher: true,
            verfied: action.payload.verfied,
            is_admin: false
        }
        case GET_STUDENT: return {
            ...state,
            user_id: action.payload.user_id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email_id: action.payload.email_id,
            image_link: action.payload.image_link,
            grade: action.payload.grade,
            board: action.payload.board,
            session_taken: action.payload.session_taken,
            is_teacher: false,
            is_admin: false
        }
        case GET_ADMIN: return {
            ...state,
            is_admin: true
        }
        case GET_LANGUAGE: return {
            ...state,
            languages: action.payload
        }
        case GET_SUBJECT: return {
            ...state,
            subjects: action.payload
        }
        case ADD_LANGUAGE: return {
            ...state,
            languages: [ ...state.languages ,action.payload]
        }
        case ADD_SUBJECT: return {
            ...state,
            subjects: [ ...state.subjects ,action.payload]
        }
        case DELETE_SUBJECT: return {
            ...state,
            subjects: state.subjects.filter(sub => sub.subject_id !== action.payload.subject_id)
        }
        case DELETE_LANGUAGE: return {
            ...state,
            languages: state.languages.filter(lang => lang.language_id !== action.payload.language_id)
        }
        case SET_ALL_LANG: return {
            ...state,
            all_languages: action.payload,
        }
        case SET_ALL_SUB: return {
            ...state,
            all_subjects: action.payload
        }
        default: return state
    }
}

export default userReducer