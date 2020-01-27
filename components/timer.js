import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: 0,
      lastUpdate: 0,
      secondsSinceStart: 0,
      endTime: 60,
      isStopped: false
    };
  }
  componentDidMount() {
    // set when the component mounted
    let startTime = new Date();

    this.setState({
      startTime: startTime,
      lastUpdate: startTime
    });
  }

  componentDidUpdate() {
    if (
      this.state.secondsSinceStart >= this.state.endTime ||
      this.state.isStopped
    ) {
      return;
    }

    let currentTime = new Date();

    // this gives us seconds since the component mounted
    var difference = (currentTime - this.state.startTime) / 1000;

    // this is time since we last updated the state
    // if componentDidMount is called 10 times a second, we don't
    // need to update the state 10 times
    var differenceSinceLastUpdate =
      (currentTime - this.state.lastUpdate) / 1000;

    // Check to see if we should update the state.
    // only if at least 1 second has passed since the last update
    if (difference > 1 && differenceSinceLastUpdate > 1) {
      console.log(`difference: ${difference}, `);

      if (difference >= this.state.endTime && this.state.isStopped == false) {
        if (this.props.onTimerComplete) {
          console.log('onTimerComplete');
          this.props.onTimerComplete();
        }
      }

      // actually update the state
      this.setState({
        secondsSinceStart: Math.floor(difference),
        lastUpdate: currentTime
      });
    }

    console.log(this.state.secondsSinceStart);
  }

  componentWillUnmount() {
    console.log('timer:componentWillUnmount');
    this.setState({
      isStopped: true
    });
  }

  render() {
    return (
      <Text
        style={{
          color: '#D32F2F',
          fontSize: 50
        }}
      >
        TIMER: {this.state.endTime - this.state.secondsSinceStart}
      </Text>
    );
  }
}
