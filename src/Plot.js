/* global Plotly */
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Plot extends Component {

  constructor () {
    super();
    this.renderPlot = this.renderPlot.bind(this);
  }

  shouldComponentUpdate (nextProps) {
    return !this.props.xData.equals(nextProps.xData) || !this.props.yData.equals(nextProps.yData);
  }

  renderPlot () {
    Plotly.newPlot('plot', [{
      x: this.props.xData.toJS(),
      y: this.props.yData.toJS(),
      type: this.props.type
    }], {
      margin: {
        t: 50, r: 0, l: 30
      },
      xaxis: {
        gridcolor: 'transparent'
      }
    }, {
      displayModeBar: false
    });
    document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
  }

  componentDidMount () {
    this.renderPlot();
  }

  componentDidUpdate () {
    this.renderPlot();
  }

  render () {
    return (
      <div id='plot' />
    );
  }
}

Plot.propTypes = {
  xData: PropTypes.array,
  yData: PropTypes.array,
  type: PropTypes.string,
  onPlotClick: PropTypes.func
};
export default Plot;
