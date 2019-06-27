import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPlanets } from '../actions';

class App extends Component {
    componentDidMount(){
        this.props.fetchPlanets();
    }
    render(){
        return(
            <div>App</div>
        )
    }
};

export default connect(null, {fetchPlanets})(App);