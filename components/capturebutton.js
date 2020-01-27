import React from 'react';
import { Button } from 'react-native-elements';


export default class CaptureButton extends React.Component {
  render() {
    return (

        <Button
          onPress={this.props.onPress}
          buttonStyle={{
            backgroundColor: '#FFAB00',
            width: 75,
            height: 75,
            borderRadius: 75
          }}
          title=""
          />

    );
  }
}

