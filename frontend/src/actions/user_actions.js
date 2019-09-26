import * as UserUtil from '../util/user_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const fetchCurrentUser = id => dispatch => (
  UserUtil.fetchCurrentUser(id).then(() => (
    dispatch(receiveCurrentUser(currentUser))
  ), err => (
    dispatch(receiveErrors(err.response.data))
  ))
);