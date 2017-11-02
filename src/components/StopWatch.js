import React, { Component } from 'react';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false
    }
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  componentWillUnmount() {
    if (this.state.isRunning) {
      clearInterval(this.timer);
    }
  }

  start(){
    this.timer = setInterval(() => this.setState({time: this.state.time + 10}), 10);
    this.setState({isRunning: true});
  }

  pause() {
    clearInterval(this.timer);
    this.setState({isRunning: false});
  }

  reset() {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      isRunning: false
    });
  }

  getTime() {
    return this.state.time;
  }
  
  formatTime(time) {
    let second = Math.floor(time / 1000);
    let centisec = Math.floor((time % 1000) /10);

    if (centisec.toString().length === 1) {
      centisec = '0' + centisec;
    }

    return (
      <div>
        <span style={{fontSize: "3em"}}>{second}</span>
        <span>s </span>
        <span style={{fontSize: "1.5em"}}>{centisec}</span>
      </div>
    );
  }

  renderButton(isRunning) {
    if (isRunning) {
      return <button onClick={this.pause} className="btn btn-danger">STOP</button>;
    } else {
      return <button onClick={this.start} className="btn btn-success">START</button>;
    }
  }

  render() {
    return (
      <div className="stop-watch panel panel-default">
        <div className="panel-heading">
          <span className="glyphicon glyphicon-time"></span>
          <a className="btn">StopWatch</a>
        </div>
        <div className="panel-body">
          {this.formatTime(this.state.time)}
        </div>
        <div className="panel-footer">
          {this.renderButton(this.state.isRunning)}
          <button onClick={this.reset} className="btn btn-default">RESET</button>
        </div>
      </div>
    );
  }
}

export default StopWatch;
