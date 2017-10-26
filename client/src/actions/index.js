import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// action creator using redux thunk
export const fetchUser = () => async (dispatch) => {
    // use relative paths
    // we don't want to dispatch an action until the promise has resolved
    const res = await axios.get('/api/current_user');
    // action 
    // when we dispatch this action we are just going to pass back the response data property
    // since we don't care too much about the rest of the data (headers, request, status etc...)
    dispatch({ type: FETCH_USER, payload: res.data })
  };


  export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
  };

  export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
    
  };

  export const fetchSurveys = () => async(dispatch) =>{
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data});
  }