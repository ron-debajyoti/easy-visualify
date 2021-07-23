import React from 'react';
import ReactModal from 'react-modal';
import { unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { expect } from '@jest/globals';
import UserModal from '../components/UserModal';
import { fakeUser } from './fakedata';

let container = null;
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

const renderingDataTest = (artistsWrapper, tracksWrapper, genreWrapper, timeType) => {
  // TODO: Snapshot testing if the data is rendered properly

  console.log(timeType);
  if (timeType === 'long') {
    artistsWrapper.children().forEach((artistNode) => {
      expect(artistNode.childAt(0).children()).toHaveLength(2);
      const id = artistNode.childAt(0).childAt(1).find('a').prop('href');
      const artistItem = fakeUser.topArtistsLong.items.filter(
        (c) => c.external_urls.spotify === id
      );
      expect(artistNode.childAt(0).childAt(1).text()).toBe(artistItem[0].name);
    });

    tracksWrapper.children().forEach((tracksNode) => {
      expect(tracksNode.childAt(0).children()).toHaveLength(2);
      const id = tracksNode.childAt(0).childAt(1).childAt(0).find('a').prop('href');
      const trackItem = fakeUser.topTracksLong.filter((c) => c.external_urls.spotify === id);
      expect(tracksNode.childAt(0).childAt(1).childAt(0).childAt(0).text()).toBe(trackItem[0].name);
    });
  } else if (timeType === 'medium') {
    artistsWrapper.children().forEach((artistNode) => {
      expect(artistNode.childAt(0).children()).toHaveLength(2);
      const id = artistNode.childAt(0).childAt(1).find('a').prop('href');
      const artistItem = fakeUser.topArtistsMedium.items.filter(
        (c) => c.external_urls.spotify === id
      );
      expect(artistNode.childAt(0).childAt(1).text()).toBe(artistItem[0].name);
    });

    tracksWrapper.children().forEach((tracksNode) => {
      expect(tracksNode.childAt(0).children()).toHaveLength(2);
      const id = tracksNode.childAt(0).childAt(1).childAt(0).find('a').prop('href');
      const trackItem = fakeUser.topTracksMedium.filter((c) => c.external_urls.spotify === id);
      expect(tracksNode.childAt(0).childAt(1).childAt(0).childAt(0).text()).toBe(trackItem[0].name);
    });
  } else {
    artistsWrapper.children().forEach((artistNode) => {
      expect(artistNode.childAt(0).children()).toHaveLength(2);
      const id = artistNode.childAt(0).childAt(1).find('a').prop('href');
      const artistItem = fakeUser.topArtistsRecent.items.filter(
        (c) => c.external_urls.spotify === id
      );
      expect(artistNode.childAt(0).childAt(1).text()).toBe(artistItem[0].name);
    });

    tracksWrapper.children().forEach((tracksNode) => {
      expect(tracksNode.childAt(0).children()).toHaveLength(2);
      const id = tracksNode.childAt(0).childAt(1).childAt(0).find('a').prop('href');
      const trackItem = fakeUser.topTracksRecent.filter((c) => c.external_urls.spotify === id);
      expect(tracksNode.childAt(0).childAt(1).childAt(0).childAt(0).text()).toBe(trackItem[0].name);
    });
  }

  artistsWrapper.children().forEach((artistNode) => {
    expect(artistNode.childAt(0).children()).toHaveLength(2);
    const id = artistNode.childAt(0).childAt(1).find('a').prop('href');
    const artistItem = fakeUser.topArtistsLong.items.filter((c) => c.external_urls.spotify === id);
    expect(artistNode.childAt(0).childAt(1).text()).toBe(artistItem[0].name);
  });

  tracksWrapper.children().forEach((tracksNode) => {
    expect(tracksNode.childAt(0).children()).toHaveLength(2);
    const id = tracksNode.childAt(0).childAt(1).childAt(0).find('a').prop('href');
    const trackItem = fakeUser.topTracksLong.filter((c) => c.external_urls.spotify === id);
    expect(tracksNode.childAt(0).childAt(1).childAt(0).childAt(0).text()).toBe(trackItem[0].name);
  });

  genreWrapper.children().forEach((genreNode, index) => {
    expect(genreNode.childAt(0).children()).toHaveLength(1);
    expect(genreNode.text()).toBe(fakeUser.recommendedGenre[index]);
  });
};

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
    act(() => {
      wrapper.update();
    });
    expect(wrapper.find('.Popup')).toBeTruthy();

    /* toggle button section */
    const toggleButtonWrapper = wrapper.find('div.toggle-button-wrapper');
    expect(toggleButtonWrapper.children()).toHaveLength(2);
    expect(toggleButtonWrapper.childAt(0).text()).toBe(' Select time : ');
    const buttonForm = toggleButtonWrapper.childAt(1);

    /* spotify data section */
    const minorWrapper = wrapper.find('section.spotify-data-wrapper');
    expect(minorWrapper.children()).toHaveLength(5);
    const artistsWrapper = wrapper.find('ul.list-artists');
    const tracksWrapper = wrapper.find('ul.list-tracks');
    const genreWrapper = wrapper.find('ul.list-genres');

    // default setting for timeType = long (all time)
    expect(artistsWrapper.children()).toHaveLength(fakeUser.topArtistsLong.items.length);
    expect(tracksWrapper.children()).toHaveLength(fakeUser.topTracksLong.length);
    expect(genreWrapper.children()).toHaveLength(fakeUser.recommendedGenre.length);

    renderingDataTest(artistsWrapper, tracksWrapper, genreWrapper, 'long');

    // changing radio button to recent
    buttonForm.simulate('change', { target: { timeType: 'recent' } });
    act(() => {
      wrapper.update();
      artistsWrapper.update();
      tracksWrapper.update();
      genreWrapper.update();
    });
    renderingDataTest(artistsWrapper, tracksWrapper, genreWrapper, 'recent');

    // changing radio button to medium
    buttonForm.simulate('change', { target: { timeType: 'medium' } });
    act(() => {
      wrapper.update();
      artistsWrapper.update();
      tracksWrapper.update();
      genreWrapper.update();
    });
    renderingDataTest(artistsWrapper, tracksWrapper, genreWrapper, 'medium');
  });
});
