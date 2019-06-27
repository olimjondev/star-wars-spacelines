import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterPlanets, clearFilterResult} from '../actions';
import _ from 'lodash';
import './Search.scss';
import $ from 'jquery';

class Search extends Component {
    state = {query: ''};
    handleChange = (e) => {
        this.setState({query: e.target.value}, ()=>{
            this.props.filterPlanets(this.state.query);
            if(this.state.query === ''){
                this.props.clearFilterResult();
            }
        });
    }
    renderSearchResults = () => {
        if(this.props.filter.results){
            const firstTen = _.dropRight(this.props.filter.results, this.props.filter.results.length - 10);
            return firstTen.map(planet => {
                return(
                    <a className="result" key={planet.url}>
                        <div className="content">
                            <div onClick={this.selectResult} className="title">{planet.name}</div>
                        </div>
                    </a>
                )
            });
        }
    }
    selectResult = (event) => {
        this.setState({query: event.currentTarget.textContent}, ()=>{
            this.props.filterPlanets(this.state.query);
            this.props.clearFilterResult();
        });
    }
    render(){
        return(
            <div className="ui search">
                <div className="ui icon input">
                    <input autoComplete="off" value={this.state.query} onChange={this.handleChange} className="prompt" type="text" placeholder="Search Planet" />
                    <i className="search icon"></i>
                </div>
                <div className={`results ${this.props.filter.results.length > 0 ? 'transition visible' : ''}`}>
                    {this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { filter: state.filter}
}

export default connect(mapStateToProps, {filterPlanets, clearFilterResult})(Search);