import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import mainReducer from './reducer.js';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

var store = createStore(mainReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
