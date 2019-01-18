import axios from 'axios';
import _ from 'lodash';
import store from '../store';
import { setToken, signout } from '../actions'
import api from '../config/Api'

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function login(username, password) {
  return axios
    .post(api.base + api.auth, {
      username,
      password
    })
    .then(function (response) {
      store.dispatch(setToken(response.data.token));
    })
    .catch(function (error) {
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
}

export function loggedIn() {
  return store.getState().token !== null;
}

export function logout() {
  store.dispatch(signout())
}

export function user() {
  return store.getState().user
}