import React, { Component } from 'react';
import './timer.css';


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 1500, breakTime: 300, onBreak: false, working: false };
  }

  componentDidMount() {
    this.setState({ working: true });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workTime === 1) {
      this.stopWorkCountdown();
    }
    if (this.state.breakTime === 1) {
      this.stopBreakCountdown();
      this.resetWorkCountdown();
    }
  }

  workCountdown(workTime) {
    if (this.state.workTime > 0) {
      this.workInterval = setInterval(() => this.setState({ workTime: this.state.workTime - 1 }), 1000);
    }
  }

  stopWorkCountdown() {
    clearInterval(this.workInterval);
  }

  resetWorkCountdown() {
    this.stopWorkCountdown();
    this.setState({ workTime: 1500 });
  }

  breakCountdown(breakTime) {
    if (this.state.breakTime > 0) {
      this.breakInterval = setInterval(() => this.setState({ breakTime: this.state.breakTime - 1 }), 1000);
    }
  }

  stopBreakCountdown() {
    clearInterval(this.breakInterval);
    this.setState({ breakTime: 300, onBreak: false, working: true });
  }

  minutesAndSeconds(rawSeconds) {
    const seconds = rawSeconds % 60;
    const minutes = Math.floor(rawSeconds / 60);
    return seconds < 10 ? minutes + ':0' + seconds : minutes + ':' + seconds;
  }

  setupBreak() {
    this.setState({ working: false, onBreak: true });
    this.breakCountdown(this.state.breakTime);
  }

  render() {
    return(
      <div className="timer">
        <h2 className={this.state.onBreak ? 'no-show' : 'timer-title'}>Work Session</h2>
        <h2 className={this.state.working ? 'no-show' : 'timer-title'}>Break</h2>
        <div className={this.state.working ? 'time-display' : 'no-show'}>{this.minutesAndSeconds(this.state.workTime)}</div>
        <div className={this.state.onBreak ? 'time-display' : 'no-show'}>{this.minutesAndSeconds(this.state.breakTime)}</div>
        <button className={this.state.workTime === 1500 ? 'start-stop-button': 'no-show'} onClick={() => {this.state.working ? this.workCountdown(this.state.workTime) : this.breakCountdown(this.state.breakTime)}}>Start</button>
        <button className={this.state.workTime < 1500 && !this.state.onBreak ? 'start-stop-button' : 'no-show'} onClick={() => this.resetWorkCountdown()}>Reset</button><br></br>
        <p className={this.state.workTime === 0 && this.state.breakTime >= 300 ? 'break-headline' : 'no-show'}>You just finished a work session! Why not take a short break?</p>
        <button className={this.state.workTime === 0 && this.state.breakTime >= 300 ? 'break-button' : 'no-show'} onClick={() => this.setupBreak()}>Take a Break</button>
      </div>
    );
  }
}

export default Timer;
