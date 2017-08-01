import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Book, Page } from 'bakareader/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: any,
};

const IMAGES = [
  require('bakareader/assets/images/dummy/content1.jpg'),
  require('bakareader/assets/images/dummy/content2.jpg'),
  require('bakareader/assets/images/dummy/content3.jpg'),
];

class Infos extends Component {
  static navigationOptions = {
    title: 'Infos',
  };
  props: PropsType;

  render() {
    return (
      <Page noMargin noNavBar>
        <View style={styles.container}>
          <Book
            currentPage={1}
            images={IMAGES}
            rtl
            totalPages={IMAGES.length}
          />
        </View>
      </Page>
    );
  }
}

export default Infos;
