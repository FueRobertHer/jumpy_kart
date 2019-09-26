import { combineReducers } from 'redux';
import session from './session_reducer';
import user from './users_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  ui,
  user
});

export default RootReducer;