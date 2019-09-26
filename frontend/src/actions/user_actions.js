import * as UserUtil from '../util/user_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

// export const receiveErrors = errors => ({
//   type: RECEIVE_SESSION_ERRORS,
//   errors
// });

export const fetchCurrentUser = id => dispatch => (
  UserUtil.fetchCurrentUser(id).then((user) => (
    dispatch(receiveCurrentUser(user))
  )
  // err => (
  //   dispatch(receiveErrors(err.response.data))
  // )
  )
);