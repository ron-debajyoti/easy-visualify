import React from 'react';
import renderer from 'react-test-renderer';
import { unmountComponentAtNode } from 'react-dom';
import PlayWidget from '../components/Widget';
import { fakePlaylistUri, fakeTrackUri } from './fakedata';

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

it('renders tracks without crashing', () => {
  const div = document.createElement('div');
  const type = 'song';
  const uri = fakeTrackUri;
  const title = 'Test 1';
  const tree = renderer.create(<PlayWidget type={type} uri={uri} title={title} />, div).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders playlists without crashing', () => {
  const div = document.createElement('div');
  const type = 'playlist';
  const uri = fakePlaylistUri;
  const title = 'Test 2';
  const tree = renderer.create(<PlayWidget type={type} uri={uri} title={title} />, div).toJSON();
  expect(tree).toMatchSnapshot();
});
