// jest.mock('');
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Main from '../components/Main';

let container = null;

jest.mock('../utils/Utility');

const waitForComponent = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
    console.log('!!!');
  });
};

// const mockUseEffect = () => {
//   useEffect.mockImplementationOnce((f) => f());
// };

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
describe('Testing the Main component : ', () => {
  it('check loading snapshot for Main', () => {
    const tree = renderer.create(<Main />, container).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should fetch user and playlist data', () => {
    const wrapper = mount(<Main />, container);
    waitForComponent(wrapper);
    expect(wrapper.exists('section-2')).toBeTruthy();
    expect(wrapper.find('section-1').length).toBe(1);
    expect(wrapper.find('h2')).toEqual('Main Page');
  });
});
