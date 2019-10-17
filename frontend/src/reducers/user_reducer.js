import { RECEIVE_HIGH_SCORE } from '../actions/user_actions';

const userReducer = ( state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HIGH_SCORE:
      return Object.assign({}, {players: action.players})
    default:
      return state;
  }
}

export default userReducer;