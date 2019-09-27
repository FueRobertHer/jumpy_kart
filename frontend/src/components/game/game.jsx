import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
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
      // time: "no timestamp yet",
      players: {},
      hostId: 0,
      gameId: 0,
      loaded: false,
      pipes: []
    };

    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.socket = null;
    this.pipes = [];
    this.characters = ['mario', 'peach', 'toad', 'yoshi'];
    this.roomId = props.match.params.roomId;
    this.username = props.location.username;
    this.userId = props.location.userId;
    this.isHost = props.location.isHost;
  }

  openSocket() {
    return new Promise((resolve, reject) => {
      this.socket = SERVER;
      let socket = this.socket;

      socket.on('placePipes', data => {
        this.setState({
          loaded: true,
          pipes: data.pipes
        });
      });

      socket.on('updateGameState', data => {
        this.setState({
          hostId: data.hostId,
          gameId: data.gameId,
        });
      });

      socket.on('playerJoined', data => {
        this.setState({
          players: data.players
        });

        // this.players = data.players.map(player => (
        //   player.id
        //   ));
      });
      resolve();
    });
  }

  loadGame() {
    return new Promise((resolve, reject) => {
      this.socket = SERVER;
      let socket = this.socket;
      socket.emit('loadGame');
      resolve();
    });
  }

  joinRoom() {
    return new Promise((resolve, reject) => {
      this.socket = SERVER;
      let socket = this.socket;
      const roomInfo = {
        type: this.props.location.type,
        roomId: this.roomId,
        userId: this.userId,
        username: this.username
      };
      socket.emit('roomInfo', roomInfo);
      resolve();
    });
}

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.openSocket()
      .then(() => this.loadGame()
        .then(() => this.joinRoom()
          .then(() => {
            this.drawBackground(ctx);
          })
        )
      )
    document.body.onkeydown = function (e) {
      if (e.keyCode == 32) {
        console.log('pressed space!'); // replace with function here;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    if (Object.keys(this.state.players).length !== 0) {
      this.drawBackground(ctx);
      this.drawObjects(ctx);
    }
  }

  drawBackground(ctx) {
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  drawObjects(ctx) {
    const that = this;

    let remainingChars = [];

    for (let i = 0; i < Object.keys(this.state.players).length; i++) {
      remainingChars.push(i)
    }

    for (let i = 0; i < Object.keys(this.state.players).length; i++) {
      const playerId = Object.keys(this.state.players)[i];

      if (playerId !== this.props.currentUserId) {
        DrawUtil._drawKart.apply(that, [ctx, this.characters[i]]);
        remainingChars.splice(i, 1);
      }
    }

    DrawUtil._drawKart(ctx, this.characters[remainingChars[0]]);
    if (this.state.loaded) DrawUtil._drawPipes(ctx, this.state.pipes);
  }

  render() {
    if (!this.props) {
      return null;
    }
    console.log('inside render() function');
    console.log(this.state);
    return (
      <div className='canvas-container'>
        <canvas ref="canvas" width="10000" height="500"/>
        <p>{this.state.time}</p>
      </div>
    )
  }
}

export default Canvas;