import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      let permissionGranted = status === 'granted';
      setHasPermission(permissionGranted);
    })();
  }, []);

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
            <Text
              style={{
                color: '#fff',
                fontSize: 50
              }}
            >
              TIMER: 00:00
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 30
              }}
            >
              Find This Item
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
                  } = await this.camera.takePictureAsync();
                  this.camera.resumePreview();
                }
              }}
              title="Click"

              buttonStyle={{
                backgroundColor: '#fff',
                width: 75,
                height: 75,
                borderRadius:75


              }}

            />

          </View>
        </View>
      </Camera>
    </View>
  );
}
