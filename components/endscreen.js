import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

export default class WinScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Yay! You've found all the items. Congrats You Won!!!! 🥳
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            onPress={() => {
              // reset the navigation stack https://reactnavigation.org/docs/en/stack-actions.html
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Camera' })]
              });
              this.props.navigation.dispatch(resetAction);
            }}
            title="Play Again"
            accessibilityLabel="button to play the game again"
            buttonStyle={styles.btn}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFAB00'
  },
  textContainer: { flex: 4, alignItems: 'center', justifyContent: 'center' },
  btnContainer: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  text: {
    paddingTop: 100,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 40,
    color: '#006064',
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center'
  },
  btn: {
    backgroundColor: '#D32F2F',
    width: 150,
    height: 50
  }
});
