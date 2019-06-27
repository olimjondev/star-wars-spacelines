import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
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

const errors = (state = {status: false, message: ''}, action) =>{
    switch(action.type){
        case CONNECTION_ERROR:
            return {...state,
                status: true,
                message: 'Server is not responding. Please retry again'
             };             
        case CONNECTION_SUCCESS:
                return {...state,
                    status: false,
                    message: ''
                 };
        default:
            return state;
    }
};

const fetchPlanets = (state = {isFetching: false, items: []}, action) =>{
    switch(action.type){
        case DATA_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case DATA_RECIEVED:
            return {
                ...state,
                isFetching: false,
                items: action.payload
            };
        case FETCH_PLANETS:
            return {...state, items: action.payload};
        default:
            return state;
    }
}

const filter = (state = {results: [], query: null, firstOrDefault: null}, action) =>{
    switch(action.type){
        case FILTER_PLANETS:
            return {
                ...state,
                results: action.payload
            }
        case CLEAR_FILTER_RESULT:
            return {
                ...state,
                results: action.payload
            };
        case QUERY:
            return {
                ...state,
                query: action.payload
            };
        case FILTER_FIRST_OR_DEFAULT:
            return {
                ...state,
                firstOrDefault: action.payload
            };
        default:
            return state;
    }
} 

export default combineReducers({
    form,
    filter,
    planets: fetchPlanets,
    errors
});