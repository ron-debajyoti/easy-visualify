import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Geographies } from 'react-simple-maps';
import { mount } from 'enzyme';
import { expect } from '@jest/globals';

import App from '../components/App';

let container = null;
jest.mock('../utils/Utility');

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Testing App component: ', () => {
  it('renders App without crashing', () => {
    jest.useFakeTimers();
    const mockSetTooltip = jest.fn();
    const mockSetTooltipContent = jest.fn();
    const wrapper = mount(
      <App setTooltip={mockSetTooltip} setTooltipContent={mockSetTooltipContent} />,
      container
    );

    return flushPromises().then(() => {
      wrapper.update();
      const geographyWrapper = wrapper.find(Geographies);
      expect(geographyWrapper).toBeTruthy();
    });

    // console.log(wrapper.debug());
  });
});
