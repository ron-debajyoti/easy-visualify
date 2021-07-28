import React, { useState } from 'react';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px;
`;

const Wrapper = styled.div`
  float: right;
  margin-right: auto;
`;

const ChartWrapper = styled.div`
  ${media.lessThan('medium')`
  min-height: 60vh;
  min-width: 40vh;
  `}

  ${media.greaterThan('medium')`
  min-height: 85vh;
  `}
`;

const Message = styled.h5`
  display: flex;
  font-weight: 75;
  color: white;
  margin: 5px;
`;

const CheckBoxLabel = styled.label`
  float: right;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  display: flex;
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const ChartTitle = styled.h3`
  text-align: center;
`;

/* PropTypes validation */
const propTypes = {
  username: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};

const getUserChartData = (chartData, username) => {
  const { labels, datasets } = chartData;
  const userDataCharts = datasets.filter((dataset) => dataset.owner === username);
  return { labels, datasets: userDataCharts };
};

const RadarChart = (props) => {
  const [toggle, setToggle] = useState(false);
  const { chartData, username } = props;
  const userChartData = getUserChartData(chartData, username);

  const handleOnChange = () => setToggle(!toggle);

  const RenderChart = (click) => {
    const { type } = click;
    if (type) {
      return (
        <ChartWrapper className="toggle-true">
          <Radar
            data={userChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                scale: { pointLabels: { fontSize: 20 } },
                labels: {
                  font: 20,
                  fontSize: window.innerWidth > 350 ? 20 : 10,
                },
              },
            }}
          />
        </ChartWrapper>
      );
    }
    return (
      <ChartWrapper className="toggle-false">
        <Radar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              scale: { pointLabels: { fontSize: 20 } },
              labels: {
                font: 20,
                fontSize: window.innerWidth > 350 ? 20 : 10,
              },
            },
          }}
        />
      </ChartWrapper>
    );
  };

  return (
    <div className="radar-chart">
      <ChartTitle style={{ color: 'white' }}>
        {' '}
        Audio Analysis of Tracks and Saved Playlists{' '}
      </ChartTitle>
      <Wrapper>
        <Message>User created playlists</Message>
        <CheckBoxWrapper>
          <CheckBox
            className="checkbox"
            id="checkbox"
            type="checkbox"
            onChange={() => handleOnChange()}
          />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
      </Wrapper>
      <RenderChart type={toggle} />
    </div>
  );
};

RadarChart.propTypes = propTypes;

export default RadarChart;
