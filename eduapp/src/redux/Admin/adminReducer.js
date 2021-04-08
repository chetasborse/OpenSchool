import sessionReducer from "../Session/sessionReducer"
import { SET_TEACHERS, SET_STUDENTS, SET_VERIFIED } from "./adminTypes"

const admin_initialState = {
    teachers: [],
    students:[]
}

const adminReducer = (state = admin_initialState, action) => {
    switch(action.type) {
        case SET_TEACHERS: return {
            ...state,
            teachers: action.payload
        }
        case SET_STUDENTS: return {
            ...state,
            students: action.payload
        } 
        case SET_VERIFIED:  {
            const index = state.teachers.findIndex(teacher => teacher.user_id === action.payload.user_id)
            const newArray = [...state.teachers]
            newArray[index].verfied = action.payload.verify
            return {
                ...state,
                teachers: newArray
            }
        }
        default: return state
    }
}

export default adminReducer;