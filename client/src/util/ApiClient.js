import axios from 'axios'
import store from '../store'
import api from '../config/Api'

export const apiClient = function () {
    const token = store.getState().token
    const params = {
        baseURL: api.base,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }
    return axios.create(params)
}