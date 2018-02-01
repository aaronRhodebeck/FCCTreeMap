import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactFauxDOM from 'react-faux-dom';
import buildTreeMap from './buildTreeMap';
import Tooltip from './Tooltip';

const ChartArea = styled.div`
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  background-color: rgb(70, 70, 70);
  box-shadow: 3px 3px 6px rgba(8, 18, 33, 0.8), -3px -3px 6px rgba(8, 18, 33, 0.8);
  min-height: 40vh;
  max-height: 90vh;
  max-width: calc(90vh * 8/4.5);
  border-radius: 15px;
`;

const ChartDescription = styled.h3`
  font-family: Verdana, sans-serif;
  font-size: 1.3em;
  text-align: center;
  margin: 5px;
  font-weight: normal;
  margin-bottom: 20px;
  color: rgb(140, 165, 198);
`;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { chartData } = this.props;
    const chart = new ReactFauxDOM.Element('div');
    buildTreeMap(chart, chartData, this);
    return (
      <ChartArea>
        <ChartDescription>{this.props.chartDescription}</ChartDescription>
        {chart.toReact()}
        {this.state.tooltip && <Tooltip info={this.state.tooltip} />}
      </ChartArea>
    );
  }
}
export default Chart;

Chart.propTypes = {
  chartDescription: PropTypes.string.isRequired,
  chartData: PropTypes.object.isRequired,
};
