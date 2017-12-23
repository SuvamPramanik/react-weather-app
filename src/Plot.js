/* global Plotly */
import React, {Component} from 'react';

class Plot extends Component {

  renderPlot = () => {
    Plotly.newPlot('plot', [{
      x: this.props.xData,
      y: this.props.yData,
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

  componentDid
  render () {
    return (
      <div id='plot' />
    );
  }
}

export default Plot;
