import { FETCH_SURVEYS } from '../actions/types';
// should always be returning a survey, so default state is an array
export default function(state = [], action) {
    switch (action.type) {
      case FETCH_SURVEYS:
        return action.payload;
      default:
        return state;
    }
  }