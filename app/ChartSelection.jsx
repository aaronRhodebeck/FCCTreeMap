import React from 'react';
import styled from 'styled-components';

const chartDataLocations = {
  kickstarterPledges:
    'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
  movieSales:
    'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
  videoGameSales:
    'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
};

const ChartList = styled.div`
  display: flex;
`;

const ChartOption = styled.li`
  text-align: center;
  font-size: 1.2em;
  color: inherit;
  display: inline-block;
  flex: 1 1 0;
  background: none;
  border: none;
  margin-left: 10vw;
  margin-right: 10vw;
  cursor: pointer;
`;

export default class ChartSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSelection: null, chartDataLocation: null };
    this.selectChart = this.selectChart.bind(this);
  }

  selectChart(chartName) {
    this.setState({
      currentSelection: chartName,
      chartDataLocation: chartDataLocations[chartName],
    });
    const chartInfo = { address: chartDataLocations[chartName], name: chartName };
    this.props.changeChart(chartInfo);
  }

  render() {
    return (
      <ChartList>
        <ChartOption onClick={() => this.selectChart('kickstarterPledges')}>
          Kickstarter Pledges
        </ChartOption>
        <ChartOption onClick={() => this.selectChart('movieSales')}>
          Movie Sales
        </ChartOption>
        <ChartOption onClick={() => this.selectChart('videoGameSales')}>
          Video Game Sales
        </ChartOption>
      </ChartList>
    );
  }
}
