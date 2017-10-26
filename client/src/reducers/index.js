import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import { reducer as reduxForm } from 'redux-form';

// whatever keys we apply to this object will
// be the keys used throughout our state
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
