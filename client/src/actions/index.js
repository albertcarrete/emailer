import axios from 'axios';
import { FETCH_USER } from './types';

// action creator using redux thunk
export const fetchUser = () => {
  return function(dispatch) {
    // use relative paths
    // we don't want to dispatch an action until the promise has resolved
    axios.get('api/current_user').then(res =>
      dispatch({
        type: FETCH_USER,
        payload: res
      })
    );
  };
};
