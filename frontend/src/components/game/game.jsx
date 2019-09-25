import React from 'react';
import { Link } from 'react-router-dom';
// import marioSprite from '../../assets/images/mario_sprite.png';
// import pipeSprite from '../../assets/images/pipes_sprite.png';
import { Pipe } from '../../classes/pipe';
import openSocket from 'socket.io-client';
import * as DrawUtil from './drawUtil';

let SERVER = openSocket("http://localhost:5000");

if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = process.env.REACT_APP_SERVER || 'http://jumpykart.herokuapp.com/#/';
}


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "no timestamp yet",
      players: {}
      // races left
      // gameStarted (from StarfighterPVP)
    };

    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.socket = null;
  }

  openSocket() {
    this.socket = SERVER;
    let socket = this.socket;
    socket.on('timer', (timestamp) => this.setState({
      time: timestamp
    }));
    socket.emit('subscribeToTimer', 1000/60);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.drawBackground(ctx);
    this.drawObjects(ctx);
    // simulating pulling value from backend to set y-coordinate of pipe
    this.openSocket();
  }

  drawBackground(ctx) {
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  drawObjects(ctx) {
    DrawUtil._drawKart(ctx)
    DrawUtil._drawPipes(ctx)
  }

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <div>
        <canvas ref="canvas" width="2200" height="500"/>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default Canvas;