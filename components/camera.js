import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import Clarifai from 'clarifai';
import Secret from '../secrets';
import CaptureButton from './capturebutton';
import Timer from './timer';
import { StackActions, NavigationActions } from 'react-navigation';

const itemsToFind = ['eyeglasses', 'book', 'pencil', 'computer'];

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
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
    // Initialise Clarifai api
    const app = new Clarifai.App({
      apiKey: Secret.APIkey
    });
    // Identify the image
    let response = await app.models.predict(Clarifai.GENERAL_MODEL, {
      base64: base64Image
    });
    console.log('CLARIFAI RESPONSE: ', response);
    return response.outputs[0].data.concepts;
  }

  render() {
    let hasPermission = this.state.hasPermission;
    let type = this.state.type;

    if (hasPermission === null) {
      return <View />;
    }

    if (hasPermission === false) {
      alert('This app requires camera permissions');
    }

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={styles.secondContainer}>
            <View style={styles.timerTextContainer}>
              <Timer
                onTimerComplete={() => {
                  Alert.alert(
                    'Game Over',
                    'You ran out of time :(',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({ routeName: 'Home' })
                            ]
                          });
                          this.props.navigation.dispatch(resetAction);
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                }}
                style={styles.timer}
              />
              <Text style={styles.text}>
                Find {itemsToFind[this.state.itemIndex]}
              </Text>
            </View>
            <View style={styles.endContainer}></View>
            <View style={styles.capBtnContainer}>
              <CaptureButton
                onPress={async () => {
                  {
                    if (this.camera) {
                      //Pauses the camera preview.
                      this.camera.pausePreview();
                      //Takes a picture and saves it to app's cache directory.
                      // Get the base64 version of the image
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
                      // Get the identified image and get predictions from clarifai API
                      const predictions = await this.identifyImage(base64);
                      console.log('PREDICTIONS: ', predictions);

                      // look at all objects in the prediction
                      // if name contains object to find
                      // then we say it's correct
                      let correct = predictions.find(item => {
                        return item.name.includes(
                          itemsToFind[this.state.itemIndex]
                        );
                      });
                      console.log(correct, 'CORRECT');
                      //if its true then we increase the itemIndex in state by one and that would be our nextIndex
                      if (correct) {
                        const nextIndex = ++this.state.itemIndex;
                        console.log('nextIndex: ', nextIndex);
                        //When the nextIdex becomes equal to or greater than the array of items to be found,
                        //then reset the itemIndex state to it's initial state and navigate to the end screen.
                        if (nextIndex >= itemsToFind.length) {
                          this.setState({
                            itemIndex: 0
                          });
                          this.props.navigation.navigate('End');
                        }
                        //otherwise we continue setting itemIndex state to nextIndex until it is either equal or
                        //greater than the array.
                        else {
                          this.setState({
                            itemIndex: nextIndex
                          });
                        }
                      }
                      //if incorrect, tell it was incorrect and to try again
                      else {
                        alert('That was incorrect. Try again!');
                      }
                      if(this.camera){
                        this.camera.resumePreview();
                      }
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },

  secondContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  timerTextContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#006064',
    fontSize: 30
  },
  endContainer: { flex: 4 },
  capBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
  // timer: {
  //   color: '#fff',
  //   fontSize: 50
  // }
});
