// @flow

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  wrapper: {
    width: 160,
    height: 300,
    marginLeft: appStyle.grid.x2,
    marginRight: appStyle.grid.x2,
  },
  cover: {
    backgroundColor: '#ccc',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  image: {
    width: 160,
    height: 240,
  },
  title: {
    marginTop: 10,
    fontSize: appStyle.font.size.large,
    textAlign: 'center',
    color: '#4a4a4a',
  },
});

type PropsType = {
  coverUri: any,
  onPress?: () => void,
  title: string
}

function Card(props: PropsType) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.wrapper}>
      <View style={styles.cover}>
        <Image source={props.coverUri} style={styles.image} />
      </View>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

Card.defaultProps = {
  onPress: () => {},
};

export default Card;
