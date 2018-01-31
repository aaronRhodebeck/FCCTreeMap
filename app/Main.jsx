import React from 'react';
import styled from 'styled-components';
import ChartSelection from './ChartSelection';
import Chart from './Chart';
import getChartData from './getChartData';

const AppArea = styled.div`
  margin: 0px;
  background-color: rgb(27, 27, 27);
  color: rgb(110, 135, 168);
`;

const PageTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 5px;
  font-family: Helvetica, sans-serif;
  text-align: center;
  font-size: 2.2em;
  text-shadow: 1px 1px 10px rgba(10, 15, 20, 0.5), -1px -1px 6px rgba(15, 20, 25, 0.2);
`;

const PageDescription = styled.p`
  margin-top: 5px;
  font-size: 1.1em;
  font-family: Arial, serif;
  text-align: center;
`;

const Link = styled.a`
  color: inherit;
`;

const Signature = styled.a`
  text-align: right;
  color: inherit;
  margin-right: 0px;
  margin-left: 70%;
`;

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartName: 'Movie Sales',
      chartDataAddress:
        'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
      chartData: null,
    };
    this.setChartData = this.setChartData.bind(this);
    this.changeChart = this.changeChart.bind(this);
  }

  componentWillMount() {
    getChartData(this.state.chartDataAddress, this.setChartData);
  }

  setChartData(data) {
    this.setState({ chartData: data });
  }

  changeChart(chartInfo) {
    this.setState({});
    this.setState({ chartDataAddress: chartInfo.address, chartName: chartInfo.name });
    getChartData(chartInfo.address, this.setChartData);
  }

  render() {
    return (
      <AppArea>
        <PageTitle>Tree Map for freeCodeCamp</PageTitle>
        <PageDescription>
          A tree map built with D3 and React for the Data Visualization Challenges <br />{' '}
          on <Link href="www.beta.freecodecamp.com">freeCodeCamp</Link> by Aaron Rhodebeck
        </PageDescription>
        <ChartSelection changeChart={this.changeChart} />
        {this.state.chartData && <Chart chartData={this.state.chartData} />}
        <Signature href="https://github.com/aaronRhodebeck" target="_blank">
          See more work by Aaron Rhodebeck
        </Signature>
      </AppArea>
    );
  }
}
