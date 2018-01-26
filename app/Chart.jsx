import React from 'react';
import styled from 'styled-components';
import withFauxDOM from 'react-faux-dom';

const ChartArea = styled.div`
  margin: 20px;
  padding: 10px;
  box-shadow: 3px 3px 20px rgba(8, 18, 33, 0.7), -3px -3px 20px rgba(8, 18, 33, 0.7);
  min-height: 40vh;
  max-height: 85vh;
  border-radius: 15px;
`;

const ChartDescription = styled.h3`
  font-family: Verdana, sans-serif;
  font-size: 1.3em;
  text-align: center;
  margin: 5px;
  font-weight: normal;
`;

export default class Chart extends React.Component {
  componentWillUpdate() {}
  render() {
    return (
      <ChartArea>
        <ChartDescription>
          Describe the currently displaying chart, which is:{' '}
          {this.props.chartData ? this.props.chartData.name : 'Loading'}
        </ChartDescription>
        Chart is building ...
      </ChartArea>
    );
  }
}
