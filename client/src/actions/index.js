import * as actionTypes from './types'

export const setToken = (data) => {
    return {
        type: actionTypes.SET_TOKEN,
        data
    }
}

export const setLogin = (data) => {
    return {
        type: actionTypes.SET_LOGIN,
        data
    }
}

export const signout = (data) => {
    return {
        type: actionTypes.USER_LOGOUT,
        data
    }
}