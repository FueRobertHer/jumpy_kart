import React from 'react';
import { Link } from 'react-router-dom';
import { Pipe } from '../../classes/pipe';
import io from 'socket.io-client';
import Game from '../../classes/game';
import Player from '../../classes/player';
import * as DrawUtil from './drawUtil';

let SERVER = io("http://localhost:5000", { transports: ['websocket'] });


if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = process.env.REACT_APP_SERVER || 'http://jumpykart.herokuapp.com/#/';
}


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "no timestamp yet",
      players: {},
      // races left
      // gameStarted (from StarfighterPVP)
      hostId: 0,
      gameId: 0
    };

    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.socket = null;
    this.pipes = [];

  }

  openSocket() {
    this.socket = SERVER;
    let socket = this.socket;
    
    socket.on('timer', (timestamp) => this.setState({
      time: timestamp
    }));
    socket.emit('subscribeToTimer', 1000/60);

    socket.on('placePipes', data => {
      this.pipes = data.pipes
    });

    socket.on('updateGameState', data => {
      console.log("updating game state")
      this.setState({
        hostId: data.hostId,
        gameId: data.gameId,
        pipes: data.pipes
      });
      setTimeout(() => {
        console.log(this.state);
      }, 1000)
    });
    
    socket.on('newGameStance', (gameClass) => {
      console.log(gameClass);
    });
  
  }

  loadGame() {
    this.socket = SERVER;
    let socket = this.socket;
    socket.emit('loadGame');
  }

  componentDidMount() {
    this.openSocket();
    this.loadGame();
    // this.openSocket();
    const gameClass = new Game();
    gameClass.loadGame()
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.drawBackground(ctx);
    this.drawObjects(ctx, gameClass.pipes);
    // simulating pulling value from backend to set y-coordinate of pipe
  }

  componentWillUnmount() {
  }

  drawBackground(ctx) {
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  drawObjects(ctx, pipes) {
    DrawUtil._drawKart(ctx)
    DrawUtil._drawPipes(ctx, pipes)
  }

  render() {
    if (!this.props) {
      return null;
    }
    
    return (
<<<<<<< HEAD
      <div>
        <canvas ref="canvas" width="2200" height="500"/>
=======
      <div className='canvas-container'>
        <canvas ref="canvas" width="10000" height="500"/>
>>>>>>> 9f84b02199997276442b1bf062149576f6f93b8d
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default Canvas;