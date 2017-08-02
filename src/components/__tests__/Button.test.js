import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

describe('Button', () => {
  it('should render a raised button', () => {
    const tree = renderer.create(
      <Button type="raised">Hello</Button>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render a flat button', () => {
    const tree = renderer.create(
      <Button type="flat">Cancel</Button>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
