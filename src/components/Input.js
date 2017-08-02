// @flow

import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: appStyle.grid.x1,
  },
});

type PropsType = {
  type: 'url',
};

function Input(props: PropsType) {
  switch (props.type) {
    case 'url':
      return <TextInput autoCorrect={false} keyboardType="url" autoCapitalize="none" style={styles.input} {...props} />;
    default:
      return <TextInput />;
  }
}

export default Input;
