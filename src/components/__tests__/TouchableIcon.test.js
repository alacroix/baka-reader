import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TouchableIcon from '../TouchableIcon';

describe('TouchableIcon', () => {
  it('should render the touchable icon', () => {
    const tree = renderer.create(
      <TouchableIcon name="fullscreen" onPress={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
