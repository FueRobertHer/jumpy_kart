import { combineReducers } from 'redux';
import session from './session_reducer';
import user from './users_reducer';
import errors from './errors_reducer';
import uiReducer from './ui_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  uiReducer,
  user
});

export default RootReducer;