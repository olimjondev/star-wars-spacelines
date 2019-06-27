import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {
    CONNECTION_ERROR,
    CONNECTION_SUCCESS,
    DATA_RECIEVED,
    DATA_REQUEST,
    FETCH_PLANETS
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

export default combineReducers({
    form,
    planets: fetchPlanets,
    errors
});