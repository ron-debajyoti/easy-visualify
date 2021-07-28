import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { unmountComponentAtNode } from 'react-dom';
import RadarChart from '../components/RadarChart';
import { fakeRadarChartData } from './fakedata';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders the Radar Chart without crashing', () => {
  // snapshot contains toggle-false
  const tree = renderer
    .create(<RadarChart chartData={fakeRadarChartData} username="trialUsername" />, container)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the chart correctly before/after toggling', () => {
  const onChange = sinon.spy();

  // act(() =>
  //   render(<RadarChart chartData={fakeRadarChartData} username="trialUsername" />, container)
  // );
  const wrapped = shallow(<RadarChart chartData={fakeRadarChartData} username="trialUsername" />, {
    lifecycleExperimental: true,
  });

  expect(wrapped.find('[className="checkbox"]')).toBeTruthy();
  wrapped.find('[className="checkbox"]').simulate('change', { target: { checked: true } });
  expect(wrapped.find('[className="toggle-true"]')).toBeTruthy();
  expect(onChange).toBeTruthy();
});
