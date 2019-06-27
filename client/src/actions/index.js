import swapi from '../rest';
import _ from 'lodash';
import {
    CONNECTION_ERROR,
    CONNECTION_SUCCESS,
    DATA_RECIEVED,
    DATA_REQUEST,
    FETCH_PLANETS,
    FILTER_PLANETS,
    CLEAR_FILTER_RESULT,
    QUERY,
    FILTER_FIRST_OR_DEFAULT
} from '../types';

export const fetchPlanets = () => async (dispatch, getState) =>{
    dispatch({type: DATA_REQUEST});
    
    return new Promise((resolve, reject) => {
        swapi.getPlanets('planets', [], resolve, reject)
    })
    .then(response => {
        dispatch({type: CONNECTION_SUCCESS});
        dispatch({type: DATA_RECIEVED});
        dispatch({type: FETCH_PLANETS, payload: response});
    })
    .catch(() =>{
        dispatch({type: CONNECTION_ERROR});
    });
};

export const filterPlanets = (query) => (dispatch, getState) =>{
    if(query && query !== ''){
        const filtered = _.filter(getState().planets.items, (planet)=>{
            return planet.name.toLowerCase().includes(query.toLowerCase());
        });
        dispatch({type: FILTER_PLANETS, payload: filtered});

        console.log(filtered, query);
        const firstOrDefault = _.head(_.filter(filtered, (planet)=>{
            return planet.name.toLowerCase() === query.toLowerCase();
        }));
        dispatch({type: FILTER_FIRST_OR_DEFAULT, payload: firstOrDefault});
    }
    dispatch({type: QUERY, payload: query});
};

export const clearFilterResult = () => (dispatch) =>{
    dispatch({type: CLEAR_FILTER_RESULT, payload: []});
};