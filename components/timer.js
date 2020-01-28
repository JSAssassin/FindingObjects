import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // time (Date) when we mounted the component
      startTime: 0,
      // number of seconds since the component mounted
      // currentTime - startTime
      secondsSinceStart: 0,

      // time (Date) when we last called setState
      lastStateUpdate: 0,

      // number of seconds since start after which the timer should stop
      endTime: 90,

      // a way to check if something has stopped the timer
      // if it's stopped, don't do anything
      isStopped: false
    };
  }

  componentDidMount() {
    // set when the component mounted
    let currentTime = new Date();

    this.setState({
      startTime: currentTime,
      lastStateUpdate: currentTime
    });
  }

  /**
   * {
      startTime: 12:00:00,
      secondsSinceStart: 10,
      lastStateUpdate: 12:00:10,
      endTime: 10,
      isStopped: true
    };
   */
  componentDidUpdate() {
    if (
      this.state.secondsSinceStart >= this.state.endTime ||
      this.state.isStopped
    ) {
      return;
    }
    // 12:00:10
    let currentTime = new Date();

    // this gives us seconds since the component mounted
    //10
    var secondsSinceStart = (currentTime - this.state.startTime) / 1000;

    // this is time since we last updated the state
    // if componentDidMount is called 10 times a second, we don't
    // need to update the state 10 times
    // 3
    var differenceSinceLastUpdate =
      (currentTime - this.state.lastStateUpdate) / 1000;

    // Check to see if we should update the state.
    // only if at least 1 second has passed since the last time we called setState
    if (differenceSinceLastUpdate >= 1) {

      if (
        secondsSinceStart >= this.state.endTime &&
        this.state.isStopped == false
      ) {
        // if we get here we've hit our goal. timer is complete.

        // this is a callback prop that we should call when the timer
        // completes. This is so the thing that uses this component
        // can do something when it stops
        if (this.props.onTimerComplete) {
          this.props.onTimerComplete();
        }

        // stop the timer
        this.setState({
          isStopped: true
        });
      }

      // actually update the state
      this.setState({
        secondsSinceStart: Math.floor(secondsSinceStart),
        lastStateUpdate: currentTime
      });
    }
  }

  componentWillUnmount() {
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
