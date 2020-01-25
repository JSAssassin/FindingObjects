import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import Expo from 'expo';
import ExpoTHREE, { THREE } from 'expo-three';
import ExpoGraphics from 'expo-graphics';

console.disableYellowBox = true;

export default class App extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  onContextCreate = async ({ gl, scale, width, height, arSession }) => {
    //initialize renderer
    this.renderer = new ExpoTHREE.Renderer({ gl });
    this.renderer.setSize(width, height);

    //initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new ExpoTHREE.createARBackgroundTexture(
      arSession,
      this.renderer
    );

    //initialize camera
    this.camera = await ExpoTHREE.createARCamera(
      arSession,
      width / scale,
      height / scale,
      0.01,
      1000
    );
  };
  onRender = async (delta) => {
    await this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <ExpoGraphics.View
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        arEnabled={true}
      />
    );
  }
}
