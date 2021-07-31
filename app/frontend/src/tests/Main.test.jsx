// jest.mock('');
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { expect } from '@jest/globals';

import Main from '../components/Main';
import App from '../components/App';
import UserModal from '../components/UserModal';
import SongRenderer from '../components/SongRenderer';

let container = null;

jest.mock('../utils/Utility');

const waitForComponent = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exitingq
  jest.clearAllMocks();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/* Tests */
describe('Testing the Main component before loading: ', () => {
  it('check loading snapshot for Main', () => {
    const tree = renderer.create(<Main />, container).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render map, data and buttons properly', () => {
    const wrapper = mount(<Main />, container);
    waitForComponent(wrapper);

    return flushPromises().then(() => {
      wrapper.update();
      const sectionOneWrapper = wrapper.find('.section-1');
      const sectionTwoWrapper = wrapper.find('.section-2');

      expect(sectionOneWrapper.exists()).toBeTruthy();
      expect(sectionTwoWrapper.exists()).toBeTruthy();

      // checking Section-1
      expect(sectionOneWrapper.exists(App)).toBeTruthy();
      expect(sectionOneWrapper.exists(UserModal)).toBeTruthy();

      // checking Section-2
      expect(sectionTwoWrapper.exists(SongRenderer));
      const buttonWrapper = sectionTwoWrapper.find('div.wrapper-button');
      expect(buttonWrapper.children().length).toBe(4);

      // TODO: button checker
      // // checking button functionality
      // const topTracksButton = buttonWrapper.childAt(0);
      // topTracksButton.simulate('click');
      // act(() => {
      //   wrapper.update();
      // });
      // console.log(wrapper.debug());
    });
  });
});
