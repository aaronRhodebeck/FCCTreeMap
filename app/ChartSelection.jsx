import React from 'react';
import styled from 'styled-components';

const chartDataLocations = {};

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
    this.state = { currentSelection: null };
  }
  render() {
    return (
      <ChartList>
        <ChartOption onClick={() => console.log('chart 1')}>Chart 1</ChartOption>
        <ChartOption onClick={() => console.log('chart 2')}>Chart 2</ChartOption>
        <ChartOption onClick={() => console.log('chart 3')}>Chart 3</ChartOption>
      </ChartList>
    );
  }
}
