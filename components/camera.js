import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
import * as jpeg from 'jpeg-js';
import * as tf from '@tensorflow/tfjs';
import { fetch } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

const itemsToFind = ['pen', 'glasses', 'book'];

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      isModelReady: false,
      itemIndex: 0
    };
  }

  async componentDidMount() {
    let { status } = await Camera.requestPermissionsAsync();
    let permissionGranted = status === 'granted';
    this.setState({
      hasPermission: permissionGranted
    });
    this.model = await mobilenet.load({
      version: 2,
      alpha: 1
    });
    this.setState({ isModelReady: true });
    console.log('MobileNet has loaded:', this.state.isModelReady);
  }

  async componentDidUpdate() {
    let { status } = await Camera.requestPermissionsAsync();
    let permissionGranted = status === 'granted';
    this.setState({
      hasPermission: permissionGranted
    });
  }

  render() {
    let hasPermission = this.state.hasPermission;
    let mobileNetReady = this.state.isModelReady;
    let type = this.state.type;

    if (hasPermission === null) {
      return <View />;
    }

    if (hasPermission === false) {
      return <Text>This app requires camera permissions.</Text>;
    }

    if (mobileNetReady === false) {
      return <Text>loading</Text>;
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
              <Text
                style={{
                  color: '#fff',
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
              <Button
                onPress={async () => {
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
                    console.log('URI: ', uri);

                    const response = await fetch(uri, {}, { isBinary: true });

                    console.log('Response: ', response);
                    const rawImageData = await response.arrayBuffer();
                    console.log(
                      'rawImageData Length: ',
                      rawImageData.byteLength
                    );
                    const imageTensor = imageToTensor(rawImageData);
                    console.log('imageTensor: ', imageTensor);

                    const predictions = await this.model.classify(imageTensor);
                    console.log(predictions);

                    // look at all objects in the prediction
                    // if className contains object to find
                    // then we say it's correct
                    let correct = predictions.find(item => {
                      return item.className.includes(
                        itemsToFind[this.state.itemIndex]
                      );
                    });
                    console.log(correct, 'CORRECT')
                    if (correct) {
                      const nextIndex = ++this.state.itemIndex;
                      console.log('NEXTINDEX: ', nextIndex)

                      if (nextIndex >= itemsToFind.length) {
                        this.props.navigation.navigate('End');
                      } else {
                        this.setState({
                          itemIndex: nextIndex
                        });
                      }
                    } else {
                      alert('That was incorrect. Try again!')
                    }
                    this.camera.resumePreview();

                  }
                }}
                title="Click"
                buttonStyle={{
                  backgroundColor: '#fff',
                  width: 75,
                  height: 75,
                  borderRadius: 75
                }}
              />
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

function imageToTensor(rawImageData) {
  const TO_UINT8ARRAY = true;
  const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  // Drop the alpha channel info for mobilenet
  const buffer = new Uint8Array(width * height * 3);
  let offset = 0; // offset into original data
  for (let i = 0; i < buffer.length; i += 3) {
    buffer[i] = data[offset];
    buffer[i + 1] = data[offset + 1];
    buffer[i + 2] = data[offset + 2];

    offset += 4;
  }

  return tf.tensor3d(buffer, [height, width, 3]);
}
