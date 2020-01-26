import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30
    };
  }
  componentDidMount() {
    let x = () => {
      console.log('x is being called');
      return this.setState({timer : this.state.timer - 1});
    };

    this.interval = setInterval(x, 1000);
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
    console.log('component did update');
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text
        style={{
          color: '#fff',
          fontSize: 50
        }}
      >
        TIMER: {this.state.timer}
      </Text>
    );
  }
}
