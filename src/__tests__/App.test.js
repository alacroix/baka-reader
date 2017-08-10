import 'react-native';
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';

import App from '../App';

const renderer = new ReactShallowRenderer();

jest.mock('../services/FileSystem');

const filterKeys = (state) => {
  if (state.routes) {
    return {
      ...state,
      routes: state.routes.map((route) => {
        const { key, ...others } = route;
        return filterKeys(others);
      }),
    };
  }
  return state;
};

describe('App', () => {
  it('should render itself', () => {
    renderer.render(<App />);
    const tree = renderer.getRenderOutput();
    tree.props.navigation.state = filterKeys(tree.props.navigation.state);
    expect(tree).toMatchSnapshot();
  });
});
