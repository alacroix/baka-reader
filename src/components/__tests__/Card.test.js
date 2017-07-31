import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../Card';

describe('Card', () => {
  it('should render the card', () => {
    const tree = renderer.create(
      <Card
        coverUri={require('bakareader/assets/images/dummy/cover1.jpg')}
        title="Card title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
