import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Main from '../components/Main';
import user from './fakedata';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exitingq
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Main renders without crashing', () => {
  const div = document.createElement('div');
  act(() => render(<Main />, div));
});
