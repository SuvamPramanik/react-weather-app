import Plot from '../Plot';
import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../App';
import {fromJS} from 'immutable';

describe('Components testing', () => {
  describe('<App />', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<App redux={fromJS({})}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('<Plot />', function () {
    global.Plotly = {
      newPlot: () => {}
    };
    global.document = {
      getElementById: function () {
        return {
          on: () => {}
        };
      }
    };

    it('renders correctly', function () {
      const tree = renderer.create(<Plot xData={fromJS({})} yData={fromJS({})} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
