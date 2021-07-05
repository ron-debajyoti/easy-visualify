import React from 'react';
import renderer from 'react-test-renderer';
import { unmountComponentAtNode } from 'react-dom';
import SongRenderer from '../components/SongRenderer';
import { fakeTrackUri, fakeTrackUri2 } from './fakedata';

const fakeListItem = {
  uri: fakeTrackUri,
  popularity: 90,
  viewCoverArt: true,
};

const fakeListItem2 = {
  uri: fakeTrackUri2,
  popularity: 50,
  viewCoverArt: false,
};

const fakeCurrentData = [
  [fakeListItem, fakeListItem2],
  [fakeListItem, fakeListItem2],
  '6sDvv5SNASdsfeeww',
  '45ba6QAtNrdv6Ke4MFOKk9',
  'United Kingdom',
];

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

it('renders top tracks without crashing', () => {
  const div = document.createElement('div');
  const tree = renderer
    .create(<SongRenderer content={fakeCurrentData} contentType="top" />, div)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders weekly playlist without crashing', () => {
  const div = document.createElement('div');
  const tree = renderer
    .create(<SongRenderer content={fakeCurrentData} contentType="weekly" />, div)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders corrent message at the start', () => {
  const div = document.createElement('div');
  const tree = renderer.create(<SongRenderer content={[]} contentType="" />, div).toJSON();
  expect(tree).toMatchSnapshot();
});
