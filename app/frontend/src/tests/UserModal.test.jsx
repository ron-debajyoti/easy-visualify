import React from 'react';
import ReactModal from 'react-modal';
import { unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import UserModal from '../components/UserModal';
import { fakeUser } from './fakedata';

let container = null;

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

describe('Testing the UserModal component', () => {
  it('renders the Modal without breaking or effects: ', () => {
    const wrapper = mount(<UserModal userObject={fakeUser} />);
    act(() => {
      wrapper.update();
    });
    expect(wrapper.props().userObject).toEqual(fakeUser);
    expect(wrapper.find('.chartjs-render-monitor')).toHaveLength(0);
    expect(wrapper.find('div.Popup')).toHaveLength(0);
  });

  it('renders the UserModal with header details: ', () => {
    ReactModal.setAppElement('div');
    const wrapper = mount(<UserModal userObject={fakeUser} />);
    act(() => {
      wrapper.update();
    });
    wrapper.find('button.modal-enter').simulate('click');
    expect(wrapper.find('.Popup')).toBeTruthy();

    // checks for proper rendering of header
    expect(wrapper.find('div.main-wrapper').children()).toHaveLength(2);
    expect(wrapper.find('div.main-wrapper').childAt(0).text()).toBe(' Statistics ');
    expect(wrapper.find('div.user-details-wrapper').children()).toHaveLength(2);
    expect(wrapper.find('div.user-details-wrapper').childAt(0).find('img').prop('src')).toEqual(
      fakeUser.images[0].url
    );
    const userNameWrapper = wrapper.find('div.user-details-wrapper').childAt(1);
    expect(userNameWrapper.children()).toHaveLength(2);
    expect(userNameWrapper.childAt(0).text()).toBe(fakeUser.display_name);
    expect(userNameWrapper.childAt(1).childAt(0).text()).toBe(`${fakeUser.followers}Followers`);
  });

  it('renders the Toggle Buttons and Spotify data accordingly', () => {
    ReactModal.setAppElement('div');
    const wrapper = mount(<UserModal userObject={fakeUser} />);
    act(() => {
      wrapper.update();
    });
    wrapper.find('button.modal-enter').simulate('click');
    expect(wrapper.find('.Popup')).toBeTruthy();

    // cehcks for toggle button and rendering of data accordingly
  });
});
