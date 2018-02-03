import React, { Component } from 'react';

class WorkSession extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 1500 };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workTime === 1) {
      this.stopCountdown();
    }
  }

  countdown(workTime) {
    if (this.state.workTime > 0) {
      this.interval = setInterval(() => this.setState({ workTime: this.state.workTime - 1 }), 1000);
    }
  }

  stopCountdown() {
    clearInterval(this.interval);
  }

  resetCountdown() {
    this.stopCountdown();
    this.setState({ workTime: 1500 });
  }

  minutesAndSeconds(rawSeconds) {
    const seconds = rawSeconds % 60;
    const minutes = Math.floor(rawSeconds / 60);
    return seconds < 10 ? minutes + ':0' + seconds : minutes + ':' + seconds;
  }

  render() {
    return(
      <div className="work-session">
        <h3>Work Session</h3>
        <div className="work-timer">{this.minutesAndSeconds(this.state.workTime)}</div>
        <button className={this.state.workTime >= 1500 ? 'start-stop-button': 'no-show'} onClick={() => this.countdown(this.state.workTime)}>Start</button>
        <button className={this.state.workTime < 1500 ? 'start-stop-button' : 'no-show'} onClick={() => this.resetCountdown()}>Reset</button>
      </div>
    );
  }
}

export default WorkSession;
