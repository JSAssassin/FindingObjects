import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => this.props.navigation.navigate('Camera')}
        >
          <Text
            style={styles.customBtnText}
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

  /* Here style the text of your button */
  customBtnText: {
    fontSize: 40,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center'
  },

  /* Here style the background of your button */
  customBtnBG: {
    backgroundColor: '#D32F2F',
    padding:30
  }
});
