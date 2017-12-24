import React, {Component} from 'react';
import xhr from 'xhr';
import './App.css';
import ErrorPage from './ErrorPage.js';
import Plot from './Plot.js';

const API_KEY = '50ebb139a30adf57eb66817bf692b98e';

class App extends Component {
  constructor () {
    super();
    this.state = {
      fetchError: false,
      location: '',
      data: {},
      dataes: [],
      temps: [],
      dataSelected: {
        date: '',
        temp: null
      }
    };
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.onPlotClick = this.onPlotClick.bind(this);
  }

  fetchWeatherData (evt) {
    evt.preventDefault();
    const location = encodeURIComponent(this.state.location);
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
          self.setState({
            fetchError: true
          });
        } else {
          var body = JSON.parse(data.body);
          var dates = [];
          var temps = [];
          for (var item of body.list) {
            dates.push(item.dt_txt);
            temps.push(item.main.temp);
          }
          self.setState({
            fetchError: false,
            data: body,
            dates: dates,
            temps: temps,
            dataSelected: {
              data: '',
              temp: null
            }
          });
        }
      });
    }
  }

  updateLocation (evt) {
    this.setState({
      location: evt.target.value
    });
  }

  onPlotClick (data) {
    if (data.points) {
      this.setState({
        dataSelected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  }

  render () {
    let currTemp = 'Loading weather data....';
    if (this.state.data.list) {
      currTemp = this.state.data.list[0].main.temp;
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
              value={this.state.location}
              onChange={this.updateLocation} />
          </label>
        </form>
        {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        { (this.state.fetchError) ? (
          <ErrorPage />
        ) : (this.state.data.list) ? (
          <div className='wrapper'>
            <p className='temp-wrapper'>
              <span className='temp'>
                {this.state.dataSelected.temp ? this.state.dataSelected.temp : currTemp}
              </span>
              <span className='temp-symbol'>°C</span>
              <span className='temp-date'>
                { this.state.dataSelected.temp ? this.state.dataSelected.date : ''}
              </span>
            </p>
            <h2>Forecast</h2>
            <Plot
              xData={this.state.dates}
              yData={this.state.temps}
              type='scatter'
              onPlotClick={this.onPlotClick} />
          </div>) : null }
      </div>
    );
  }
}

export default App;
