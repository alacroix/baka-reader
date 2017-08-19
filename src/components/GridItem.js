// @flow

import React, { PureComponent } from 'react';

import Card from './Card';

type PropsType = {
  item: BookType,
  onPressItem: (item: BookType) => void,
}

class GridItem extends PureComponent {
  componentWillMount() {
    this._onPress = this._onPress.bind(this);
  }

  props: PropsType;

  _onPress: Function;

  _onPress() {
    this.props.onPressItem(this.props.item);
  }

  render() {
    const { item } = this.props;
    return (
      <Card
        coverUri={{ uri: `${item.path}/thumbnail.jpg` }}
        onPress={this._onPress}
        title={item.name}
      />
    );
  }
}

export default GridItem;
