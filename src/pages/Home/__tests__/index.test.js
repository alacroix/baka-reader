import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../index';

jest.mock('../../../services/FileSystem');

describe('AppLoader', () => {
  it('should render itself', () => {
    const navigation = {
      state: {
        params: {
          books: [],
        },
      },
    };

    const tree = renderer.create(
      <Home navigation={navigation} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
