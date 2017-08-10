// @flow

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Grid, Page } from 'bakareader/src/components';
import { getBookInfos } from 'bakareader/src/services/FileSystem';
import appStyle from 'bakareader/src/appStyle';

import ModalDownload from './ModalDownload';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: appStyle.font.size.huge,
    marginTop: appStyle.grid.x2,
    marginLeft: appStyle.grid.x2,
  },
});

type PropsType = {
  navigation: any,
};

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
    gesturesEnabled: false,
  };

  state = {
    modalVisible: false,
  }

  componentWillMount() {
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
  }

  onBookPress(book: RNFetchBlobStat) {
    getBookInfos(book.path)
      .then(infos => this.props.navigation.navigate('infos', { book, currentPage: 1, infos }));
  }

  toggleModalVisibility: Function;

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  props: PropsType;

  render() {
    const books = this.props.navigation.state.params.books;
    return (
      <Page noMargin>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>
              Collection
            </Text>
            <Grid books={books} onBookPress={book => this.onBookPress(book)} />
            <Button onPress={this.toggleModalVisibility}>Go to the Download modal</Button>
            <ModalDownload
              isVisible={this.state.modalVisible}
              onClose={this.toggleModalVisibility}
            />
          </ScrollView>
        </View>
      </Page>
    );
  }
}

export default Home;
