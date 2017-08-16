// @flow

import React, { Component } from 'react';
import { AppState, StatusBar, StyleSheet, View } from 'react-native';
import { Book, Page, TouchableIcon } from 'bakareader/src/components';
import { saveProgression } from 'bakareader/src/services/Storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type PropsType = {
  navigation: any,
};

type StateType = {
  appState: string,
  lastPress: number,
}

class Infos extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const isHidden: boolean = state.params ? state.params.isHidden : false;
    const book: RNFetchBlobStat = state.params.book;
    if (isHidden) {
      return { header: null, gesturesEnabled: false };
    }

    return {
      title: `${book.filename} [${state.params.currentPage} / ${state.params.infos.totalPages}]`,
      headerRight: (
        <TouchableIcon
          name="fullscreen"
          onPress={() => setParams({ isHidden: true })}
        />
      ),
    };
  };

  state: StateType;

  componentWillMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.setState({
      appState: '',
      lastPress: 0,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.handleBookExit();
  }

  handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'inactive') {
      this.handleBookExit();
    }
  }

  handleBookExit() {
    const { book, currentPage, infos } = this.props.navigation.state.params;
    saveProgression(book, currentPage, currentPage === infos.totalPages);
  }

  handlePageChange(currentPage: number) {
    this.props.navigation.setParams({
      currentPage,
    });
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

  toggleNavigationBar() {
    const { state, setParams } = this.props.navigation;
    const isHidden = state.params ? state.params.isHidden : false;
    setParams({ isHidden: !isHidden });
  }

  handlePress: Function;
  handlePageChange: Function;

  props: PropsType;

  render() {
    const { params } = this.props.navigation.state;
    const isStatusBarHidden = params ? params.isHidden : false;
    return (
      <Page noMargin noNavBar>
        <StatusBar hidden={isStatusBarHidden} />
        <View style={styles.container}>
          <Book
            currentPage={params.currentPage}
            totalPages={params.infos.totalPages}
            book={params.book}
            rtl
            onPageChange={this.handlePageChange}
            onPress={this.handlePress}
          />
        </View>
      </Page>
    );
  }
}

export default Infos;
