import xhr from 'xhr';

export function changeLocation (newLocation) {
  return ({
    type: 'CHANGE_LOCATION',
    location: newLocation
  });
}

export function setSelectedDate (date) {
  return ({
    type: 'SET_SELECTED_DATE',
    dateSelected: date
  });
}

export function setSelectedTemp (temp) {
  return ({
    type: 'SET_SELECTED_TEMP',
    tempSelected: temp
  });
}

export function setData (data) {
  return ({
    type: 'SET_DATA',
    data: data
  });
}

export function setDates (dates) {
  return ({
    type: 'SET_DATES',
    dates: dates
  });
}

export function setTemps (temps) {
  return ({
    type: 'SET_TEMPS',
    temps: temps
  });
}

export function setErrorStatus (error) {
  return ({
    type: 'SET_ERROR_STATUS',
    fetchError: error
  });
}

export function fetchData (url) {
  return function thunk (dispatch) {
    xhr({
      url: url
    }, function (err, data) {
      if (data.statusCode === 404) {
        dispatch(setErrorStatus(true));
      } else {
        var body = JSON.parse(data.body);
        var dates = [];
        var temps = [];
        for (var item of body.list) {
          dates.push(item.dt_txt);
          temps.push(item.main.temp);
        }
        dispatch(setErrorStatus(false));
        dispatch(setData(body));
        dispatch(setDates(dates));
        dispatch(setTemps(temps));
        dispatch(setSelectedTemp(null));
        dispatch(setSelectedDate(''));
      }
    });
  };
}
