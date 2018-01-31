import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactFauxDOM from 'react-faux-dom';
import buildTreeMap from './buildTreeMap';

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

const Chart = ({ chartData }) => {
  const chart = new ReactFauxDOM.Element('div');
  buildTreeMap(chart, chartData, this);
  return (
    <ChartArea>
      <ChartDescription>
        Describe the currently displaying chart, which is:{' '}
        {chartData ? chartData.name : 'Loading'}
      </ChartDescription>
      {chart.toReact()}
    </ChartArea>
  );
};

export default Chart;

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
};
