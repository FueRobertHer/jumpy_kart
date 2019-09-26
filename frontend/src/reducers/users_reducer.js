import { RECEIVE_CURRENT_USER } from '../actions/user_actions';

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser }
    default:
      return state;
  }
}