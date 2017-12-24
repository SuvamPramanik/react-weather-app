import PropTypes from 'prop-types';
import React, {Component} from 'react';
import xhr from 'xhr';
import './App.css';
import ErrorPage from './ErrorPage.js';
import Plot from './Plot.js';
import {changeLocation, setData, setDates, setErrorStatus, setSelectedDate, setSelectedTemp, setTemps} from './action.js';
import {connect} from 'react-redux';

const API_KEY = '50ebb139a30adf57eb66817bf692b98e';

class App extends Component {
  constructor () {
    super();

    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);
  }

  fetchWeatherData (evt) {
    evt.preventDefault();
    const location = encodeURIComponent(this.props.location);
    if (location !== '') {
      const apiPrefix = 'https://api.openweathermap.org/data/2.5/forecast?q=';
      const apiSuffix = '&APPID=' + API_KEY + '&units=metric';
      const api = apiPrefix + location + apiSuffix;

      // Used for getting the reference inside other components
      const self = this;

      xhr({
        url: api
      }, function (err, data) {
        if (data.statusCode === 404) {
          self.props.dispatch(setErrorStatus(true));
        } else {
          var body = JSON.parse(data.body);
          var dates = [];
          var temps = [];
          for (var item of body.list) {
            dates.push(item.dt_txt);
            temps.push(item.main.temp);
          }
          self.props.dispatch(setErrorStatus(false));
          self.props.dispatch(setData(body));
          self.props.dispatch(setDates(dates));
          self.props.dispatch(setTemps(temps));
          self.props.dispatch(setSelectedTemp(null));
          self.props.dispatch(setSelectedDate(''));
        }
      });
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
    if (this.props.data.list) {
      currTemp = this.props.data.list[0].main.temp;
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
              value={this.props.location}
              onChange={this.updateLocation} />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        { (this.props.fetchError) ? (
          <ErrorPage />
        ) : (this.props.data.list) ? (
          <div className='wrapper'>
            <p className='temp-wrapper'>
              <span className='temp'>
                {this.props.tempSelected ? this.props.tempSelected : currTemp}
              </span>
              <span className='temp-symbol'>°C</span>
              <span className='temp-date'>
                { this.props.tempSelected ? this.props.dateSelected : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.props.dates}
              yData={this.props.temps}
              type='scatter'
              onPlotClick={this.onPlotClick} />
          </div>) : null }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

App.propTypes = {
  location: PropTypes.string,
  dispatch: PropTypes.func,
  data: PropTypes.object,
  fetchError: PropTypes.bool,
  tempSelected: PropTypes.number,
  dateSelected: PropTypes.string,
  dates: PropTypes.array,
  temps: PropTypes.array
};

export default connect(mapStateToProps)(App);
