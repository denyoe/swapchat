import axios from 'axios'
import store from '../store'
import api from '../config/Api'

// export const apiClient = function() {
//     const token = store.getState().token
//     console.log(token)
//     const params = {
//         baseURL: URL,
//         headers: {'Authorization': 'Token ' + token}
//     };
//     return axios.create(params)
// }

export const apiClient = function () {
    const token = 'token'
    const params = {
        baseURL: api.base,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }
    return axios.create(params)
}