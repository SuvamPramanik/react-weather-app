import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './App.css';
import ErrorPage from './ErrorPage.js';
import Plot from './Plot.js';
import {changeLocation, fetchData, setSelectedDate, setSelectedTemp} from './action.js';
import {connect} from 'react-redux';

const API_KEY = '50ebb139a30adf57eb66817bf692b98e';

export class App extends Component {
  constructor () {
    super();

    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);
  }

  fetchWeatherData (evt) {
    evt.preventDefault();
    const location = encodeURIComponent(this.props.redux.get('location'));
    if (location !== '') {
      const apiPrefix = 'https://api.openweathermap.org/data/2.5/forecast?q=';
      const apiSuffix = '&APPID=' + API_KEY + '&units=metric';
      const api = apiPrefix + location + apiSuffix;

      this.props.dispatch(fetchData(api));
    }
  }

  updateLocation (evt) {
    this.props.dispatch(changeLocation(evt.target.value));
  }

  onPlotClick (data) {
    if (data.points) {
      this.props.dispatch(setSelectedDate(data.points[0].x));
      this.props.dispatch(setSelectedTemp(data.points[0].y));
    }
  }

  render () {
    let currTemp = 'Loading weather data....';
    if (this.props.redux.getIn(['data', 'list'])) {
      currTemp = this.props.redux.getIn(['data', 'list', 0, 'main', 'temp']);
    }
    return (
      <div className={'weather-div'}>
        <h1>Weather Page</h1>
        <form onSubmit={this.fetchWeatherData}>
          <label>I want to know the weather for
            <input
              id={'place-input'}
              placeholder={'City, Country'}
              type='text'
              value={this.props.redux.get('location')}
              onChange={this.updateLocation} />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        { (this.props.redux.get('fetchError')) ? (
          <ErrorPage />
        ) : (this.props.redux.getIn(['data', 'list'])) ? (
          <div className='wrapper'>
            <p className='temp-wrapper'>
              <span className='temp'>
                {this.props.redux.get('tempSelected') ? this.props.redux.get('tempSelected') : currTemp}
              </span>
              <span className='temp-symbol'>°C</span>
              <span className='temp-date'>
                { this.props.redux.get('tempSelected') ? this.props.redux.get('dateSelected') : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.redux.get('dates')}
              yData={this.props.redux.get('temps')}
              type='scatter'
              onPlotClick={this.onPlotClick} />
          </div>) : null }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    redux: state
  };
}

App.propTypes = {
  redux: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(mapStateToProps)(App);
