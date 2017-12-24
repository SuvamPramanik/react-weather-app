import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mainReducer from './reducer.js';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

var store = createStore(mainReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
