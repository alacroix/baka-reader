// @flow

import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import appStyle from 'bakareader/src/appStyle';

import GridItem from './GridItem';

const styles = StyleSheet.create({
  grid: {
    marginTop: appStyle.grid.x2,
  },
  content: {
    paddingTop: appStyle.grid.x2,
    paddingBottom: appStyle.grid.x4,
  },
});

type PropsType = {
  books: Array<BookType>,
  onBookPress: (book: BookType) => void,
}

class Grid extends PureComponent {
  _keyExtractor = (item: BookType) => item.id;

  _onPressItem = (book: BookType) => {
    this.props.onBookPress(book);
  }

  _renderItem = ({ item }) => (
    <GridItem
      item={item}
      onPressItem={this._onPressItem}
    />
  )

  props: PropsType;

  render() {
    return (
      <View style={styles.grid}>
        <FlatList
          contentContainerStyle={styles.content}
          data={this.props.books}
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
