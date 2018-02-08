import React, { Component } from 'react';
import './timer.css';
import buzz from 'buzz';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 1500, breakTime: 300, onBreak: false, onLongBreak: false, working: false, workSessionCount: 1 };
    this.sound = new buzz.sound('assets/audio/bell.wav', { volume: 100, preload: true });
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    this.setState({ working: true });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.workTime === 1) {
      this.sound.play();
      this.stopWorkCountdown();
    }
    if (this.state.breakTime === 1) {

      this.stopBreakCountdown();
      this.resetWorkCountdown();
      this.sound.play();
    }
  }

  workCountdown(workTime) {
    if (this.state.workTime > 0) {
      this.workInterval = setInterval(() => this.setState({ workTime: this.state.workTime - 1 }), 1);
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
      this.breakInterval = setInterval(() => this.setState({ breakTime: this.state.breakTime - 1 }), 1);
    }
  }

  stopBreakCountdown() {
    clearInterval(this.breakInterval);
    this.setState({ onBreak: false, onLongBreak: false, working: true });
    this.state.workSessionCount === 4 ? this.setState({ breakTime: 1800 }) : this.setState({ breakTime: 300 });
  }

  minutesAndSeconds(rawSeconds) {
    const seconds = rawSeconds % 60;
    const minutes = Math.floor(rawSeconds / 60);
    return seconds < 10 ? minutes + ':0' + seconds : minutes + ':' + seconds;
  }

  setupBreak() {
    let workSessionCount = this.state.workSessionCount;
    this.setState({ working: false, onBreak: true });
    this.state.workSessionCount < 4 ? this.setState({ workSessionCount: workSessionCount + 1, onLongBreak: false }) : this.setState({ workSessionCount: 1, onLongBreak: true });
    this.breakCountdown(this.state.breakTime);
  }

  play() {
    this.sound.play();
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
        <p className={!this.state.onBreak && this.state.workSessionCount !== 4 && this.state.workTime === 0 ? 'break-headline' : 'no-show'}>You just finished a work session! Why not take a short break?</p>
        <p className={!this.state.onBreak && this.state.workSessionCount === 4 && this.state.workTime === 0 ? 'break-headling' : 'no-show'}>You just finished 4 work sessions!  Take a long break!</p>
        <button className={!this.state.onBreak && this.state.workTime === 0 ? 'break-button' : 'no-show'} onClick={() => this.setupBreak()}>Take a Break</button>
      </div>
    );
  }
}

export default Timer;
