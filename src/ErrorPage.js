import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ErrorPage extends Component {
  componentDidMount () {
    ReactDOM.render(
      <div>
        <span className='error-text'>No Weather data found for location <b> {this.props.location} </b> </span>
        <span className='error-image' >
          <img id='sad-img' src={'./assets/sad_emoji.png'} />
        </span>
        <p> Please try again! </p>
      </div>, document.getElementById('error-wrapper')
    );
  }
  render () {
    return (
      <p id='error-wrapper' />
    );
  }
}

export default ErrorPage;
