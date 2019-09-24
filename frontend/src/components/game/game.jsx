import React from 'react';
import { Link } from 'react-router-dom';
import marioSprite from '../../assets/images/mario_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';
import { Pipe } from '../../classes/pipe';
import openSocket from 'socket.io-client';

let SERVER = openSocket("http://localhost:5000");

if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = process.env.REACT_APP_SERVER || "https://starfight.herokuapp.com/";
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
    this.openSocket = this.openSocket.bind(this);
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
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let mario = new Image();
    mario.src = marioSprite;
    mario.onload = () => {
      ctx.drawImage(mario, 100, 100);
    }
    let pipe = new Image();
    pipe.src = pipeSprite;
    pipe.onload = () => {
      ctx.drawImage(pipe, Pipe.width, 200);
    }
    // simulating pulling value from backend to set y-coordinate of pipe
    this.openSocket();
  }

  drawObjects() {

  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="900" height="300"/>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default Canvas;