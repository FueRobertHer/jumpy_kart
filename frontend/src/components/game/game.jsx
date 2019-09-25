import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
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
      hostId: 0,
      gameId: 0
    };

    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.socket = null;
    this.pipes = [];
    this.players = ['5d8b9788267f8251c5872003', '5d8b978xxxxxxxxxxxxxxx03'];
    this.characters = ['mario', 'peach', 'toad', 'yoshi']
  }

  openSocket() {
    this.socket = SERVER;
    let socket = this.socket;
    
    socket.on('timer', (timestamp) => this.setState({
      time: timestamp
    }));
    socket.emit('subscribeToTimer', 1000/60);

    socket.on('placePipes', data => {
      console.log('placing pipes');
      this.pipes = data.pipes
    });

    socket.on('updateGameState', data => {
      this.pipes = data.pipes;
      console.log("updating game state")
      this.setState({
        hostId: data.hostId,
        gameId: data.gameId,
        // pipes: data.pipes
      });
    });
  }

  loadGame() {
    this.socket = SERVER;
    let socket = this.socket;
    socket.emit('loadGame');
  }

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    this.openSocket();
    this.loadGame();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.drawBackground(ctx);
    this.drawObjects(ctx);
  }

  componentWillUnmount() {
  }

  drawBackground(ctx) {
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  drawObjects(ctx) {
    const that = this;

    let remainingChars = [];

    for (let i = 0; i < this.players.length; i++) {
      remainingChars.push(i)
    }

    for (let i = 0; i < this.players.length; i++) {
      const playerId = this.players[i];

      if (playerId !== this.props.currentUserId) {
        DrawUtil._drawKart.apply(that, [ctx, this.characters[i]]);
        remainingChars.splice(i, 1);
      }
    }

    DrawUtil._drawKart(ctx, this.characters[remainingChars[0]]);
    console.log(this.pipes);
    // DrawUtil._drawPipes(ctx, this.state.pipes)
  }

  render() {
    if (!this.props) {
      return null;
    }
    
    return (
      <div className='canvas-container'>
        <canvas ref="canvas" width="10000" height="500"/>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default Canvas;