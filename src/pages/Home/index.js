import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card, Grid, HorizontalSlider, Page } from 'bakareader/src/components';
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>
              En cours
            </Text>
            <HorizontalSlider>
              <Card coverUri={require('bakareader/assets/images/dummy/cover1.jpg')} title="Nisekoi Tome 1" />
              <Card coverUri={require('bakareader/assets/images/dummy/cover2.jpg')} title="Nisekoi Tome 2" />
              <Card coverUri={require('bakareader/assets/images/dummy/cover3.jpg')} title="Nisekoi Tome 3" />
            </HorizontalSlider>
            <Button onPress={this._goToInfos}>Go to the Infos page</Button>
            <Text style={styles.header}>
              Collection
            </Text>
            <Grid />
          </ScrollView>
        </View>
      </Page>
    );
  }
}

export default Home;
