import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, Button, Card } from 'bakareader/src/components';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: appStyle.font.size.huge,
    textAlign: 'center',
    margin: appStyle.grid.x1,
  },
  instructions: {
    textAlign: 'center',
    color: appStyle.colors.darkGray,
    marginBottom: appStyle.grid.x1,
  },
});

type PropsType = {
  navigation: any,
};

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  props: PropsType;

  _goToInfos = () => {
    this.props.navigation.navigate('infos');
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Card coverUri={require('bakareader/assets/images/dummy/cover1.jpg')} title="Card title" />
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Shake or press menu button for dev menu
          </Text>
          <Button onPress={this._goToInfos}>Go to the Infos page</Button>
        </View>
      </Page>
    );
  }
}

export default Home;
