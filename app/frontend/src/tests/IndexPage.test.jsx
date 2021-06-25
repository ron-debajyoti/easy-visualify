import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import IndexPage from '../components/IndexPage';

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

it('IndexPage runs without crashing', () => {
  const div = document.createElement('div');
  render(
    <BrowserRouter>
      <IndexPage />
    </BrowserRouter>,
    div
  );
});
