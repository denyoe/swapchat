import * as actionTypes from './types'

export const setToken = (data) => {
    return {
        type: actionTypes.SET_TOKEN,
        data
    }
}