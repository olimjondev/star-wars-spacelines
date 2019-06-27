import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Planet from './Planet';
import './Planet.scss';

class PlanetScene extends Component{
    constructor(props){
        super(props);
        this.MAX_SIZE = 7;
        this.EARTH = 12742;
    }

    calcSize = (type) =>{
        const {planet} = this.props;
        let size;
        if(planet.diameter && planet.diameter !== 'unknown'){
            if(type === 'earth'){
                size = this.EARTH > planet.diameter ? this.MAX_SIZE : this.EARTH / planet.diameter * this.MAX_SIZE;
                console.log(size, 'earth');
                return size;
            }
            else{
                size = this.EARTH > planet.diameter ? planet.diameter / this.EARTH * this.MAX_SIZE : this.MAX_SIZE;
                console.log(size, 'planet');
                return size;
            }
        }
        else{
            return this.MAX_SIZE;
        }
    }

    render(){
        const {planet} = this.props;
        console.log(planet);
        if(!planet){
            return (
            <div className="planets scene">
                Loading...
            </div>
            );
        }
        return (
            <div className="planets scene">
                <Planet size={this.calcSize('earth')} planetTexture="earth" class="content-left" />
                <Planet planet={planet} size={this.calcSize()} planetTexture="jupiter" class="delay content-right" />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {planet: state.filter.firstOrDefault};
}
export default connect(mapStateToProps)(PlanetScene);