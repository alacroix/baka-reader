import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Card from '../Card';

describe('Card', () => {
  it('should render the card', () => {
    const tree = renderer.create(
      <Card
        coverUri={require('fake/path/image.jpg')}
        title="Card title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
