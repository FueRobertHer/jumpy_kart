import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';
import userReducer from './user_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  ui,
  userReducer
});

export default RootReducer;