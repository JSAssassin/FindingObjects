import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

export default class WinScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFAB00'
        }}
      >
        <View
          style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={styles.text}>
            Yay! You've found all the items. Congrats You Won!!!! 🥳
          </Text>
        </View>
        <View
          style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            onPress={() => {
              // reset the navigation stack
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Camera' })]
              });
              this.props.navigation.dispatch(resetAction);
            }}
            title="Play Again"
            accessibilityLabel="button to play the game again"
            buttonStyle={{
              backgroundColor: '#D32F2F',
              width: 150,
              height: 50
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 40,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center'
  }
});
