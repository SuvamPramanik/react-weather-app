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

// reducer funtion for our application
export default function mainReducer (state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_LOCATION':
    return state.set('location', action.location);
  case 'SET_SELECTED_TEMP':
    return state.set('tempSelected', action.tempSelected);
  case 'SET_SELECTED_DATE':
    return state.set('dateSelected', action.dateSelected);
  case 'SET_DATA':
    return state.set('data', fromJS(action.data));
  case 'SET_DATES':
    return state.set('dates', fromJS(action.dates));
  case 'SET_TEMPS':
    return state.set('temps', fromJS(action.temps));
  case 'SET_ERROR_STATUS':
    return state.set('fetchError', action.fetchError);
  default:
    return state;
  }
}
