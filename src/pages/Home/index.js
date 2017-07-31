import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Page, Button, Card, HorizontalSlider } from 'bakareader/src/components';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: appStyle.font.size.huge,
    marginTop: appStyle.grid.x2,
    marginLeft: appStyle.grid.x2,
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
      <Page noMargin>
        <View style={styles.container}>
          <Text style={styles.header}>
            En cours
          </Text>
          <HorizontalSlider>
            <Card coverUri={require('bakareader/assets/images/dummy/cover1.jpg')} title="Nisekoi Tome 1" />
            <Card coverUri={require('bakareader/assets/images/dummy/cover2.jpg')} title="Nisekoi Tome 2" />
            <Card coverUri={require('bakareader/assets/images/dummy/cover3.jpg')} title="Nisekoi Tome 3" />
          </HorizontalSlider>
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
