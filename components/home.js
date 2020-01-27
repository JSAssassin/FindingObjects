import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.BtnBG}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text
            style={styles.BtnText}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            numberOfLines={1}
            allowFontScaling
          >
            Let's Start!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006064'
  },

  BtnText: {
    fontSize: 40,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center'
  },

  BtnBG: {
    backgroundColor: '#D32F2F',
    padding:30
  }
});
