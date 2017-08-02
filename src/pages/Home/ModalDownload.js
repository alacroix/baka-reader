// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import appStyle from 'bakareader/src/appStyle';
import { Button, Input } from 'bakareader/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: '15%',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    padding: appStyle.grid.x3,
  },
  modalHeader: {
    marginBottom: 20,
    fontSize: appStyle.font.size.huge,
  },
  modalContent: {},
  label: {
    marginBottom: appStyle.grid.x1,
  },
  modalFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

type StateType = {
  url: string,
}

type PropsType = {
  isVisible: boolean,
  onClose: () => void,
  onConfirm?: ({url: string}) => void,
}

class ModalDownload extends Component {
  static defaultProps = {
    onConfirm: () => {},
  }

  state: StateType;

  componentWillMount() {
    this.onConfirm = this.onConfirm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setState({
      url: '',
    });
  }

  onConfirm: Function;
  onInputChange: Function;

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm({ url: this.state.url });
      this.props.onClose();
    }
  }

  onInputChange(newUrl: string) {
    this.setState({
      url: newUrl,
    });
  }

  props: PropsType;

  render() {
    return (
      <Modal isVisible={this.props.isVisible} style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalBody}>
            <Text style={styles.modalHeader}>Ajouter un livre</Text>
            <View style={styles.modalContent}>
              <Text style={styles.label}>URL</Text>
              <Input
                onChangeText={this.onInputChange}
                placeholder="URL du livre"
                type="url"
                value={this.state.url}
              />
            </View>
          </View>
          <View style={styles.modalFooter}>
            <Button onPress={this.props.onClose} type="flat">Annuler</Button>
            <Button onPress={this.onConfirm} type="flat">Télécharger</Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalDownload;
