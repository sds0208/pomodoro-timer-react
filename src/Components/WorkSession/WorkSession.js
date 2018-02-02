import React, { Component } from 'react';

class WorkSession extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 1500 };
  }

  componentDidMount() {
    this.countdown();
  }

  componentWillUnmount() {

  }

  countdown() {
    setInterval(() => this.setState({ workTime: this.state.workTime - 1 }), 1000);
  }

  render() {
    return(
      <div className="work-session">
        <div className="work-timer">{this.state.workTime}</div>
        <button className="start-stop-button">Start/Stop</button>
      </div>
    );
  }
}

export default WorkSession;
