// @flow

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type PropsType = {
  name: string,
  onPress: () => void,
};

function TouchableIcon(props: PropsType) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={styles.container}>
      <Icon name={props.name} size={30} color={appStyle.colors.darkGray} />
    </TouchableOpacity>
  );
}

export default TouchableIcon;
