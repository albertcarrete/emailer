import axios from 'axios';
import { FETCH_USER } from './types';

// action creator using redux thunk
export const fetchUser = () => async (dispatch) => {
    // use relative paths
    // we don't want to dispatch an action until the promise has resolved
    const res = await axios.get('/api/current_user');
    
    dispatch({ type: FETCH_USER, payload: res })
  };
