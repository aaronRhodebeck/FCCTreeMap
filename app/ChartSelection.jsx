import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const chartInfo = {
  kickstarterPledges: {
    name: 'Kickstarter Pledges',
    address:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
    description: 'The top 100 most pledged Kisckstarter campaigns, grouped by catagory',
  },
  movieSales: {
    name: 'Movie Sales',
    address:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
    description: 'The top 100 highest grossing movies, grouped by genre',
  },
  videoGameSales: {
    name: 'Video Game Sales',
    address:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
    description: 'The top 100 most sold video games, grouped by platform',
  },
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
    this.selectChart = this.selectChart.bind(this);
  }

  selectChart(chartName) {
    const selectedChart = chartInfo[chartName];
    const selectedChartInfo = {
      address: selectedChart.address,
      name: selectedChart.name,
      description: selectedChart.description,
    };
    this.props.changeChart(selectedChartInfo);
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

ChartSelection.propTypes = {
  changeChart: PropTypes.func.isRequired,
};
