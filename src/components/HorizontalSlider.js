// @flow

import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import appStyle from 'bakareader/src/appStyle';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: appStyle.grid.x4,
    marginBottom: appStyle.grid.x2,
  },
  content: {
    paddingLeft: appStyle.grid.x2,
    paddingRight: appStyle.grid.x2,
  },
});

type PropsType = {
  children: Array<any>
}

function HorizontalSlider(props: PropsType) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}

export default HorizontalSlider;
