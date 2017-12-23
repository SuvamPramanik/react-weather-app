import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ErrorPage extends Component {
  render () {
    return (
      <p id='error-wrapper'>
        <span className='error-text'>No Weather data found.</span>
        <span className='error-image' >
          <img id='sad-img' src={'./assets/sad_emoji.png'} alt='' />
        </span>
        <p> Please try again! </p>
      </p>
    );
  }
}

export default ErrorPage;
