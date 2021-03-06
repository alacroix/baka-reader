// @flow

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000',
  },
  leftZone: {
    position: 'absolute',
    left: 0,
    width: '15%',
    height: '100%',
  },
  rightZone: {
    position: 'absolute',
    right: 0,
    width: '15%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

type PropsType = {
  book: BookType,
  currentPage: number,
  rtl?: boolean,
  onPageChange?: (number) => void,
  onPress?: () => void,
}

type StateType = {
  currentPage: number,
  loading: boolean,
  pages: Array<any>,
}

class Book extends Component {
  static defaultProps = {
    rtl: false,
    onPageChange: () => {},
    onPress: () => {},
  }

  state: StateType;

  componentWillMount() {
    this.handlePress = this.handlePress.bind(this);
    this.handleLeftZonePress = this.handleLeftZonePress.bind(this);
    this.handleRightZonePress = this.handleRightZonePress.bind(this);
    this.setState({
      currentPage: this.props.currentPage,
    });
  }

  handlePress: Function;
  handleLeftZonePress: Function;
  handleRightZonePress: Function;

  props: PropsType;

  handlePress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  handleZonePress(side: string) {
    let { currentPage } = this.state;
    const { book, onPageChange, rtl } = this.props;
    if (rtl) {
      currentPage += side === 'left' ? 1 : -1;
    } else {
      currentPage += side === 'right' ? 1 : -1;
    }

    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > book.totalPages) {
      currentPage = book.totalPages;
    }

    if (onPageChange) {
      onPageChange(currentPage);
    }

    this.setState({
      currentPage,
    });
  }

  handleLeftZonePress() {
    this.handleZonePress('left');
  }

  handleRightZonePress() {
    this.handleZonePress('right');
  }

  render() {
    const imageUri = `${this.props.book.path}/pages/${this.state.currentPage}.jpg`;
    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={this.handlePress} style={StyleSheet.absoluteFill}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode={'contain'} />
        </TouchableWithoutFeedback>
        <View style={styles.leftZone}>
          <TouchableWithoutFeedback onPress={this.handleLeftZonePress}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.rightZone}>
          <TouchableWithoutFeedback onPress={this.handleRightZonePress}>
            <View style={StyleSheet.absoluteFill} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default Book;
