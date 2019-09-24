import React from 'react';
import { Link } from 'react-router-dom';
// import marioSprite from '../../assets/images/mario_sprite.png';
// import pipeSprite from '../../assets/images/pipes_sprite.png';
import { Pipe } from '../../classes/pipe';
import * as DrawUtil from './drawUtil';
import io from 'socket.io-client';

const server = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  server = process.env.REACT_APP_SERVER || "https://starfight.herokuapp.com/";
}


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time left
      players: {}
      // races left
      // gameStarted (from StarfighterPVP)
    }

    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
  }

  openSocket() {
    this.socket = io(server);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.drawBackground(ctx);
    this.drawObjects(ctx);
    // simulating pulling value from backend to set y-coordinate of pipe
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
        <canvas ref="canvas" width="900" height="500"/>
      </div>
    )
  }
}

export default Canvas;