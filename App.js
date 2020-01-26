import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/home';
import CameraScreen from './components/camera';
import WinScreen from './components/endscreen'
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen,
    End: WinScreen
  },
  {
    initialRouteName: 'Home'
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  state = {
    isTfReady: false
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true
    });
    console.log('Tensorflow has loaded:', this.state.isTfReady);
  }

  render() {
    if (this.state.isTfReady) {
      return <AppContainer />;
    }
    return <Text>loading...</Text>
  }
}
