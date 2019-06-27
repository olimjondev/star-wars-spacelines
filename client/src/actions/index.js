import swapi from '../rest';
import {
    CONNECTION_ERROR,
    CONNECTION_SUCCESS,
    DATA_RECIEVED,
    DATA_REQUEST,
    FETCH_PLANETS
} from '../types';

export const fetchPlanets = () => async (dispatch, getState) =>{
    dispatch({type: DATA_REQUEST});
    
    return new Promise((resolve, reject) => {
        swapi.getPlanets('planets', [], resolve, reject)
    })
    .then(response => {
        console.log(response);
        dispatch({type: CONNECTION_SUCCESS});
        dispatch({type: DATA_RECIEVED});
        dispatch({type: FETCH_PLANETS, payload: response});
    })
    .catch(() =>{
        dispatch({type: CONNECTION_ERROR});
    });
};