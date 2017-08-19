// @flow

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Grid, GridItem, HorizontalSlider, Page } from 'bakareader/src/components';
import { filterByProgress, getUserBooks } from 'bakareader/src/services/BookManager';
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

  constructor(props) {
    super(props);

    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    getUserBooks()
      .then((books) => {
        console.log(books.length);
        this.state = {
          books,
        };
      });
  }

  state = {
    modalVisible: false,
    books: [],
  }

  onBookPress(book: BookType) {
    this.props.navigation.navigate('infos', { book, currentPage: 1 });
  }

  toggleModalVisibility: Function;

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  props: PropsType;

  render() {
    const { books } = this.state;
    console.log('render');
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
