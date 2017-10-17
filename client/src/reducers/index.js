import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys we apply to this object will
// be the keys used throughout our state
export default combineReducers({
  auth: authReducer
});
