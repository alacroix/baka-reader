import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../Input';

describe('Input', () => {
  it('should render an URL formatted input ', () => {
    const tree = renderer.create(
      <Input type="url" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an default input if no type is provided', () => {
    const tree = renderer.create(
      <Input />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
