import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setLeft = mousePosition => {
  const width = window.innerWidth;
  let left = 0;
  if (mousePosition.x > width / 2) {
    left = mousePosition.x - width * 0.3;
  } else {
    left = mousePosition.x + width * 0.1;
  }
  return left;
};

const setTop = mousePosition => mousePosition.y * 0.7;

const prettyPrintValue = num => num.toLocaleString();

const Base = styled.div`
  position: absolute;
  left: ${props => setLeft(props.mousePosition) + 'px'};
  top: ${props => setTop(props.mousePosition) + 'px'};
  width: 25vw;
  background-color: rgb(250, 250, 250);
  visibility: ${props => props.visibility};
  padding-right: 30px;
  padding-bottom: 1vh;
  border-radius: 2px;
`;

const Category = styled.p`
  margin: 7px;
  margin-bottom: 1vh;
  color: ${props => props.color};
  text-shadow: 1px 0px 2px rgb(50, 50, 50), -1px 0px 2px rgb(50, 50, 50),
    0px 1px 2px rgb(50, 50, 50), 0px -1px 2px rgb(50, 50, 50);
  font-family: Helvetica;
  letter-spacing: 2px;
  font-size: 0.9em;
`;

const Name = styled.h3`
  margin: 3px;
  position: relative;
  left: 10%;
  font-size: 1.3em;
  color: rgb(60, 85, 118);
`;

const Value = styled.p`
  position: relative;
  left: 20%;
  margin: 0px;
  margin-top: 7px;
  font-size: 1.2em;
  font-weight: bold;
  color: rgb(90, 115, 148);
`;

const Tooltip = ({ info }) => {
  const { location, visibility, data } = info;
  return (
    <Base mousePosition={location} visibility={visibility}>
      <Category color={data.color}>{data.category}</Category>
      <Name>{data.name}</Name>
      {data.value && (
        <Value>{`$${prettyPrintValue(Number.parseFloat(data.value))}`}</Value>
      )}
    </Base>
  );
};

export default Tooltip;

Tooltip.propTypes = {
  info: PropTypes.object.isRequired,
};
