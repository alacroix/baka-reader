// @flow

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Grid, GridItem, HorizontalSlider, Page } from 'bakareader/src/components';
import { filterByProgress, getCurrentPage, getUserBooks } from 'bakareader/src/services/BookManager';
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
    books: [],
  }

  componentWillMount() {
    this.onBooksUpdate = this.onBooksUpdate.bind(this);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    getUserBooks()
      .then((books) => {
        console.log('got books');
        books.addListener(this.onBooksUpdate);
        this.setState({
          books,
        });
      });
  }

  componentWillUnmount() {
    this.state.books.removeAllListeners();
  }

  onBookPress(book: BookType) {
    const { navigate } = this.props.navigation;
    getCurrentPage(book)
      .then(currentPage => navigate('infos', { book, currentPage }));
  }

  onBooksUpdate(collection) {
    this.setState({
      books: collection,
    });
  }

  toggleModalVisibility: Function;

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  props: PropsType;

  render() {
    const { books } = this.state;
    let inProgress = [];
    if (books.length > 0) {
      inProgress = filterByProgress(books);
    }
    return (
      <Page noMargin>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>
              En cours
            </Text>
            <HorizontalSlider>
              {
                inProgress.map(book => (
                  <GridItem
                    item={book}
                    key={book.id}
                    onPressItem={item => this.onBookPress(item)}
                  />
                ))
              }
            </HorizontalSlider>
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
