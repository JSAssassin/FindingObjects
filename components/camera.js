import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import Clarifai from 'clarifai';
import Secret from '../secrets';
import CaptureButton from './capturebutton';
import Timer from './timer';

const itemsToFind = ['eyeglasses', 'book'];

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      itemIndex: 0
    };
  }

  async componentDidMount() {
    let { status } = await Camera.requestPermissionsAsync();
    let permissionGranted = status === 'granted';
    this.setState({
      hasPermission: permissionGranted
    });
  }

  async componentDidUpdate() {
    let { status } = await Camera.requestPermissionsAsync();
    let permissionGranted = status === 'granted';
    this.setState({
      hasPermission: permissionGranted
    });
  }

  async identifyImage(base64Image) {
    const app = new Clarifai.App({
      apiKey: Secret.APIkey
    });
    // Identify the image
    let response = await app.models.predict(Clarifai.GENERAL_MODEL, {
      base64: base64Image
    });
    return response.outputs[0].data.concepts;
  }

  render() {
    let hasPermission = this.state.hasPermission;
    let type = this.state.type;

    if (hasPermission === null) {
      return <View />;
    }

    if (hasPermission === false) {
      return <Text>This app requires camera permissions.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Timer
                onTimerComplete={() => {
                  alert("Time's up!");
                }}
                style={{
                  color: '#fff',
                  fontSize: 50
                }}
              />
              <Text
                style={{
                  color: '#006064',
                  fontSize: 30
                }}
              >
                Find {itemsToFind[this.state.itemIndex]}
              </Text>
            </View>
            <View style={{ flex: 4 }}></View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CaptureButton
                onPress={async () => {
                  {
                    if (this.camera) {
                      this.camera.pausePreview();
                      let {
                        uri,
                        width,
                        height,
                        exif,
                        base64
                      } = await this.camera.takePictureAsync({
                        quality: 0,
                        base64: true
                      });
                      const predictions = await this.identifyImage(base64);
                      console.log(predictions);

                      // look at all objects in the prediction
                      // if className contains object to find
                      // then we say it's correct
                      let correct = predictions.find(item => {
                        return item.name.includes(
                          itemsToFind[this.state.itemIndex]
                        );
                      });
                      console.log(correct, 'CORRECT');
                      if (correct) {
                        const nextIndex = ++this.state.itemIndex;
                        console.log('nextIndex: ', nextIndex);

                        if (nextIndex >= itemsToFind.length) {
                          this.setState({
                            itemIndex: 0
                          });
                          this.props.navigation.navigate('End');
                        } else {
                          this.setState({
                            itemIndex: nextIndex
                          });
                        }
                      } else {
                        alert('That was incorrect. Try again!');
                      }
                      this.camera.resumePreview();
                    }
                  }
                }}
              />
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
