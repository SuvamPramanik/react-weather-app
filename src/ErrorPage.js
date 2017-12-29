import React, {Component} from 'react';

class ErrorPage extends Component {
  render () {
    return (
      <div id='error-wrapper'>
        <span className='error-text'>No Weather data found 😔</span>
        <p> Please try again! </p>
      </div>
    );
  }
}

export default ErrorPage;
