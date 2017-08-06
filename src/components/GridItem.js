// @flow

import React, { PureComponent } from 'react';

import Card from './Card';

type PropsType = {
  item: RNFetchBlobStat,
  onPressItem: (item: RNFetchBlobStat) => void,
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
        title={item.filename}
      />
    );
  }
}

export default GridItem;
