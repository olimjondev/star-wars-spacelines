import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPlanets } from '../actions';
import Search from './Search';
import PlanetScene from './PlanetScene';
import Modal from './Modal';
import './App.scss';

class App extends Component {
    componentDidMount(){
        this.props.fetchPlanets();
    }
    renderContent(planet){
        if(planet){
            return(
                <>
                    <PlanetScene />
                    <Modal btnText={`Buy a ticket to ${planet.name}`} header="Ticket Details" planet={planet} />
                </>
            )
        }
        else{
            return(
                <div className="intro">
                    <h2>Please select a planet to fly to</h2>
                </div>
            )
        }
    }
    render(){
        const {planet, isFetching} = this.props;
        if(isFetching){
            return <div className="loader">Loading...</div>
        }
        return(
            <div className="ui container">
                <Search />
                {this.renderContent(planet)}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {filter: state.filter, isFetching: state.planets.isFetching, planet: state.filter.firstOrDefault};
}

export default connect(mapStateToProps, {fetchPlanets})(App);