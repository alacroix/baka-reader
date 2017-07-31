// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

type PropsType = {
  children: any,
  noMargin?: boolean,
  noNavBar?: boolean,
  backgroundColor?: string,
}

function Page(props: PropsType) {
  return (
    <View
      style={[styles.page, {
        paddingTop: props.noNavBar ? 0 : appStyle.grid.x2,
        paddingHorizontal: props.noMargin ? 0 : appStyle.grid.x3,
        backgroundColor: props.backgroundColor,
      }]}
    >
      {props.children}
    </View>
  );
}

Page.defaultProps = {
  children: null,
  noMargin: false,
  noNavBar: false,
  backgroundColor: appStyle.colors.color,
};

export default Page;
