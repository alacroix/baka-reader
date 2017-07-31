import { Text } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import HorizontalSlider from '../HorizontalSlider';

describe('HorizontalSlider', () => {
  it('should render the horizontal slider', () => {
    const tree = renderer.create(
      <HorizontalSlider>
        <Text>Test</Text>
        <Text>Test 2</Text>
      </HorizontalSlider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
