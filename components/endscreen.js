import React, { Component } from 'react';
import {View, Text} from 'react-native';
export default class WinScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Yay! You've found all the items. Congrats You Won!!!! Thanks for bearing the slow game 🥳</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Camera')}
          title="Play Again"
          accessibilityLabel="button to play the game again"
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
