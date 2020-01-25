import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Button } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => this.props.navigation.navigate('Camera')}
          title="Let's Start!"
          accessibilityLabel="button to start the game"
          buttonStyle={{
            backgroundColor: '#7487A3',
            width: 150,
            height: 50
          }}
        />
      </View>
    );
  }
}
