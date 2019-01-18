import { combineReducers } from 'redux'
import * as actionType from '../actions/types'

const initState = null;
const token = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_TOKEN:
            return action.data.split(' ')[1]
        case actionType.USER_LOGOUT:
            return initState
        default:
            return state
    }
}

const user = (state = initState, action) => {
    switch (action.type) {
        case actionType.SET_LOGIN:
            return action.data
        case actionType.USER_LOGOUT:
            return initState
        default:
            return state
    }
}

const appReducer = combineReducers({
    token, user
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer