// @flow

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: appStyle.dimensions.touchableHeight,
    marginVertical: appStyle.grid.x1,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: appStyle.dimensions.visibleButtonHeight,
    backgroundColor: appStyle.colors.primary,
    paddingHorizontal: appStyle.grid.x1,
  },
  text: {
    textAlign: 'center',
    color: appStyle.colors.lightText,
    fontSize: appStyle.font.size.default,
  },
});

type PropsType = {
  children: string,
  onPress?: () => void,
}

function Button(props: PropsType) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.button}>
        <Text style={[styles.text]}>{props.children.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  onPress: () => {},
};

export default Button;
