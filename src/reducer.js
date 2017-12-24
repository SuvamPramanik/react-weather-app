const initialState = {
  fetchError: false,
  location: '',
  data: {},
  dates: [],
  temps: [],
  dateSelected: '',
  tempSelected: null
};

// reducer funtion for our application
export default function mainReducer (state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_LOCATION':
    return Object.assign({}, state, {
      location: action.location
    });
  case 'SET_SELECTED_TEMP':
    return Object.assign({}, state, {
      tempSelected: action.tempSelected
    });
  case 'SET_SELECTED_DATE':
    return Object.assign({}, state, {
      dateSelected: action.dateSelected
    });
  case 'SET_DATA':
    return Object.assign({}, state, {
      data: action.data
    });
  case 'SET_DATES':
    return Object.assign({}, state, {
      dates: action.dates
    });
  case 'SET_TEMPS':
    return Object.assign({}, state, {
      temps: action.temps
    });
  case 'SET_ERROR_STATUS':
    return Object.assign({}, state, {
      fetchError: action.fetchError
    });
  default:
    return state;
  }
}
