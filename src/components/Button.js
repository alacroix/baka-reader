// @flow

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: appStyle.dimensions.touchableHeight,
    minWidth: 64,
    paddingHorizontal: appStyle.grid.x1,
  },
  button: {
    justifyContent: 'center',
    height: appStyle.dimensions.visibleButtonHeight,
    paddingHorizontal: appStyle.grid.x1,
  },
  text: {
    textAlign: 'center',
    fontSize: appStyle.font.size.default,
  },
  raisedButton: {
    backgroundColor: appStyle.colors.primary,
  },
  raisedText: {
    color: appStyle.colors.lightText,
  },
  flatButton: {
    backgroundColor: 'transparent',
  },
  flatText: {
    color: appStyle.colors.primary,
  },
});

type PropsType = {
  children: string,
  type?: 'flat' | 'raised',
  onPress?: () => void,
}

function Button(props: PropsType) {
  switch (props.type) {
    case 'flat':
      return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={styles.container}>
          <View style={[styles.button, styles.flatButton]}>
            <Text style={[styles.text, styles.flatText]}>{props.children.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={styles.container}>
          <View style={[styles.button, styles.raisedButton]}>
            <Text style={[styles.text, styles.raisedText]}>{props.children.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      );
  }
}

Button.defaultProps = {
  type: 'raised',
  onPress: () => {},
};

export default Button;
