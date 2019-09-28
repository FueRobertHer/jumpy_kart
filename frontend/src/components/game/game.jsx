import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import * as DrawUtil from './drawUtil';
import roadSprite from '../../assets/images/road.png';

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
    this.keyDown = false;
  }

  openSocket() {
    console.log('running openSocket')
    return new Promise((resolve, reject) => {
      this.socket = SERVER;
      let socket = this.socket;
      console.log('openSocket socket');
      console.log(socket);

      socket.on('placePipes', data => {
        console.log('IN PLACEPIPES');
        console.log(data);
        this.setState({
          loaded: true,
          pipes: data.pipes
        });
      });

      socket.on('updateGameState', data => {
        this.setState({
          hostId: data.hostId,
          gameId: data.gameId,
          players: data.players
        });
      });

      socket.on('playerJoined', data => {
        this.setState({
          players: data.players
        });
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
    this.socket = SERVER;
    let socket = this.socket;
    let keyDown = this.keyDown; 
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.openSocket()
      .then(() => this.joinRoom()
        .then(() => this.loadGame()
          .then(() => {
            this.drawBackground(ctx);
          })
        )
      )
    document.body.onkeydown = function (e) {
      if (e.keyCode === 32) {
        console.log('pressed space!');
        // keyDown = e.keyCode;
        // socket.emit('btnDown', keyDown);
        socket.emit('btnDown');
      }
    }
  }

  // this.state.players is in correct order
  // maybe have a new object that contains each 
  // player but also with the character sprite name
  // 

  componentDidUpdate(prevProps, prevState) {
    console.log('updating')
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
    console.log(this.state.players)
    const that = this;
    let remainingChars = [];

    for (let i = 0; i < Object.keys(this.state.players).length; i++) {
      remainingChars.push(i)
    }

    for (let i = 0; i < Object.keys(this.state.players).length; i++) {
      const playerId = Object.keys(this.state.players)[i];
      if (playerId !== this.props.currentUserId) {
        DrawUtil._drawKart.apply(that, [ctx, this.characters[i], Object.values(this.state.players)[i].pos]);
        remainingChars.splice(i, 1);
      }
    }

    DrawUtil._drawKart(ctx, this.characters[remainingChars[0]], Object.values(this.state.players)[remainingChars[0]].pos);
    if (this.state.loaded) DrawUtil._drawPipes(ctx, this.state.pipes)
      .then(() => {
        let road = new Image();
        road.src = roadSprite;
        road.onload = () => {
          ctx.drawImage(road, 0, 476);
        }
      })
      // make new png of background
  }

  render() {
    if (!this.props) {
      return null;
    }
    console.log('inside render() function');
    console.log(this.state);
    return (
      <div className='canvas-container'>
        <canvas ref="canvas" width="10000" height="500" />
        <p>{this.state.time}</p>
      </div>
    )
  }
}
export default Canvas;

// 476