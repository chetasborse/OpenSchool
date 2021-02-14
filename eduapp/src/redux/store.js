import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import sessionReducer from './Session/sessionReducer'
import userReducer from './Users/userReducer'

const rootReducer = combineReducers({
    users: userReducer,
    session: sessionReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store