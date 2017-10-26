import { FETCH_USER } from '../actions/types';

// - records whether or not the user is logged in
// - our state needs an initial state
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // null - indicates we really don't know who is logged in yet
      // user model - object containing user, we are logged in
      // false - definitely no user logged in
      return action.payload || false;
    default:
      return state;
  }
}
