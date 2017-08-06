import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Book, Page, TouchableIcon } from 'bakareader/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  book: RNFetchBlobStat,
  navigation: any,
};

class Infos extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const isHidden: boolean = state.params ? state.params.isHidden : false;
    const book: RNFetchBlobStat = state.params.book;
    if (isHidden) {
      return { header: null, gesturesEnabled: false };
    }

    return {
      title: book.filename,
      headerRight: (
        <TouchableIcon
          name="fullscreen"
          onPress={() => setParams({ isHidden: true })}
        />
      ),
    };
  };

  componentWillMount() {
    this.handlePress = this.handlePress.bind(this);
    this.setState({
      lastPress: 0,
    });
  }

  props: PropsType;

  handlePress: Function;

  toggleNavigationBar() {
    const { state, setParams } = this.props.navigation;
    const isHidden = state.params ? state.params.isHidden : false;
    setParams({ isHidden: !isHidden });
  }

  handlePress() {
    const delta = new Date().getTime() - this.state.lastPress;
    if (delta < 200) { // DOUBLE TAP
      this.toggleNavigationBar();
    }
    this.setState({
      lastPress: new Date().getTime(),
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const isStatusBarHidden = params ? params.isHidden : false;
    return (
      <Page noMargin noNavBar>
        <StatusBar hidden={isStatusBarHidden} />
        <View style={styles.container}>
          <Book
            currentPage={1}
            book={params.book}
            rtl
            onPress={this.handlePress}
          />
        </View>
      </Page>
    );
  }
}

export default Infos;
