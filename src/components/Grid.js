// @flow

import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import appStyle from 'bakareader/src/appStyle';
import Card from './Card';

const styles = StyleSheet.create({
  grid: {
    marginTop: appStyle.grid.x2,
  },
  content: {
    paddingTop: appStyle.grid.x2,
    paddingBottom: appStyle.grid.x4,
  },
});

class Grid extends PureComponent {
  _keyExtractor = (item, index) => index.toString();

  _renderItem() {
    return (
      <Card coverUri={require('../../assets/images/dummy/cover1.jpg')} title="Nisekoi Tome 1" />
    );
  }

  render() {
    const data = [
      { title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }, { title: 5 }, { title: 6 },
    ];
    return (
      <View style={styles.grid}>
        <FlatList
          contentContainerStyle={styles.content}
          data={data}
          keyExtractor={this._keyExtractor}
          numColumns={4}
          renderItem={this._renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default Grid;
