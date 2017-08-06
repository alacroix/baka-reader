// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import appStyle from 'bakareader/src/appStyle';
import { Page } from 'bakareader/src/components';
import {
  createBooksDirectory,
  formatBook,
  getUserBooks,
  getUserImportedBooks,
} from 'bakareader/src/services/FileSystem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: appStyle.font.size.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '10%',
  },
  status: {
    fontSize: appStyle.font.size.default,
    textAlign: 'center',
  },
});

type PropsType = {
  navigation: any,
};

class AppLoader extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    createBooksDirectory();
    getUserImportedBooks()
      .then((rawBooks) => {
        this.importRawBooks(rawBooks);
      });
  }

  importRawBooks(rawBooks: Array<RNFetchBlobStat>) {
    Promise.all(rawBooks.map(book => formatBook(book)))
      .then(() => getUserBooks())
      .then(books => this.props.navigation.navigate('home', { books }));
  }

  props: PropsType;

  render() {
    return (
      <Page noMargin>
        <View style={styles.container}>
          <Text style={styles.title}>Baka Reader</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Initialisation...</Text>
        </View>
      </Page>
    );
  }
}

export default AppLoader;
