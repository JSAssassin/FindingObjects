import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default class CaptureButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.capBtn} />
    );
  }
}

const styles = StyleSheet.create({
  capBtn: {
    backgroundColor: '#FFAB00',
    width: 75,
    height: 75,
    borderRadius: 75
  }
});
