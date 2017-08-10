import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import AppLoader from '../index';

jest.mock('../../../services/FileSystem');

describe('AppLoader', () => {
  it('should render itself', () => {
    const tree = renderer.create(
      <AppLoader />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
