import * as UserUtil from '../util/user_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const fetchCurrentUser = id => dispatch => (
  UserUtil.fetchCurrentUser(id).then(res => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    UserUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  }
  // err => (
  //   dispatch(receiveErrors(err.response.data))
  // )
  )
);