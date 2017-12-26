import {changeLocation, setData, setDates, setErrorStatus, setSelectedDate, setSelectedTemp, setTemps} from '../action.js';

describe('action', () => {
  describe('changeLocation', () => {
    it('should have type CHANGE_LOCATION', () => {
      expect(changeLocation().type).toEqual('CHANGE_LOCATION');
    });

    it('should update to new location passed', () => {
      const expectedLocation = 'Kolkata, India';
      expect(changeLocation(expectedLocation).location).toEqual(expectedLocation);
    });
  });

  describe('setSelectedDate', () => {
    it('should have type SET_SELECTED_DATE', () => {
      expect(setSelectedDate().type).toEqual('SET_SELECTED_DATE');
    });
    it('Case 1: should update to midnight date passed ', () => {
      const date = '2017-12-27';
      const expectedDate = '2017-12-27 00H';
      expect(setSelectedDate(date).dateSelected).toEqual(expectedDate);
    });
    it('Case 2: should update to any other date passed', () => {
      const date = '2017-10-15 06';
      const expectedDate = '2017-10-15 06H';
      expect(setSelectedDate(date).dateSelected).toEqual(expectedDate);
    });
  });

  describe('setSelectedTemp', () => {
    it('shoudl have type SET_SELECTED_TEMP', () => {
      expect(setSelectedTemp().type).toEqual('SET_SELECTED_TEMP');
    });
    it('should update to temperature passed', () => {
      const temp = '11.46';
      expect(setSelectedTemp(temp).tempSelected).toEqual(temp);
    });
  });

  describe('setData', () => {
    it('shoudl have type SET_DATA', () => {
      expect(setData().type).toEqual('SET_DATA');
    });
    it('should update to data passed', () => {
      const data = {sample: 'sample'};
      expect(setData(data).data).toEqual(data);
    });
  });

  describe('setDates', () => {
    it('shoudl have type SET_DATES', () => {
      expect(setDates().type).toEqual('SET_DATES');
    });
    it('should update to dates list passed', () => {
      const dates = ['2018-01-01', '2017-27-12'];
      expect(setDates(dates).dates).toEqual(dates);
    });
  });

  describe('setTemps', () => {
    it('shoudl have type SET_TEMPS', () => {
      expect(setTemps().type).toEqual('SET_TEMPS');
    });
    it('should update to temperature list passed', () => {
      const temps = ['12.01', '21.97'];
      expect(setTemps(temps).temps).toEqual(temps);
    });
  });

  describe('setErrorStatus', () => {
    it('shoudl have type SET_ERROR_STATUS', () => {
      expect(setErrorStatus().type).toEqual('SET_ERROR_STATUS');
    });
    it('should update the status of the API call', () => {
      const fetchError = true;
      expect(setErrorStatus(fetchError).fetchError).toEqual(fetchError);
    });
  });
});
