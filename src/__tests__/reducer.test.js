import mainReducer from '../reducer';
import {fromJS} from 'immutable';

const initialState = fromJS({
  fetchError: false,
  location: '',
  data: {},
  dates: [],
  temps: [],
  dateSelected: '',
  tempSelected: null
});

describe('mainReducer', () => {
  it('should retain the initialState', () => {
    expect(mainReducer(initialState, {})).toEqual(initialState);
  });

  it('should react to an action with the type CHANGE_LOCATION', () => {
    const location = 'Kolkata, India';
    const newState = initialState.set('location', location);
    expect(mainReducer(initialState, {
      type: 'CHANGE_LOCATION',
      location: location
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_SELECTED_TEMP', () => {
    const selectedTemp = '11.62';
    const newState = initialState.set('tempSelected', selectedTemp);
    expect(mainReducer(initialState, {
      type: 'SET_SELECTED_TEMP',
      tempSelected: selectedTemp
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_SELECTED_DATE', () => {
    const dateSelected = '2017-12-15';
    const newState = initialState.set('dateSelected', dateSelected);
    expect(mainReducer(initialState, {
      type: 'SET_SELECTED_DATE',
      dateSelected: dateSelected
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_DATA', () => {
    const data = fromJS({sample: 'sample'});
    const newState = initialState.set('data', data);
    expect(mainReducer(initialState, {
      type: 'SET_DATA',
      data: data
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_DATES', () => {
    const dates = fromJS(['2017-12-27', '2017-12-28']);
    const newState = initialState.set('dates', dates);
    expect(mainReducer(initialState, {
      type: 'SET_DATES',
      dates: dates
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_TEMPS', () => {
    const temps = fromJS(['12', '20']);
    const newState = initialState.set('temps', temps);
    expect(mainReducer(initialState, {
      type: 'SET_TEMPS',
      temps: temps
    })).toEqual(newState);
  });

  it('should react to an action with the type SET_ERROR_STATUS', () => {
    const fetchError = false;
    const newState = initialState.set('fetchError', fetchError);
    expect(mainReducer(initialState, {
      type: 'SET_ERROR_STATUS',
      fetchError: fetchError
    })).toEqual(newState);
  });
});
