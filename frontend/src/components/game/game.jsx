import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import * as DrawUtil from './drawUtil';

let SERVER;

if (process.env.NODE_ENV !== "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = io("http://localhost:5000", { transports: ['websocket'] });
}

if (process.env.NODE_ENV === "production") {
  console.log(`process.env: ${process.env}`);
  SERVER = io();
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time: "no timestamp yet",
      players: {},
      hostId: 0,
      gameId: 0,
      pipes: [],
      coins: [],
      bananas: [],
      mushrooms: [],
      items: []
    };
    this.jump = this.jump.bind(this);
    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.emitStartGame = this.emitStartGame.bind(this);
    this.socket = null;
    this.characters = ['mario', 'peach', 'toad', 'yoshi'];
    this.userNums = [];
    this.roomId = props.match.params.roomId;
    this.username = props.location.username;
    this.userId = props.location.userId;
    this.isHost = props.location.isHost;
    this.keyDown = false;
    this.players = [];
    this.pipes = [];
    this.items = [];
  }

  openSocket() {
    return new Promise(resolve => {
      this.socket = SERVER;
      let socket = this.socket;

      socket.on('placeItems', data => {
        this.pipes = Object.values(data.pipes);
        this.items = Object.values(data.items);
        this.drawObjects();
      });

      socket.on('updateGameState', data => {
        this.setState({
          hostId: data.hostId,
          gameId: data.gameId,
        });
        this.players = Object.values(data.players);
      });

      socket.on('playerJoined', data => {
        this.players = Object.values(data.players);
        this.drawObjects();
      });

      resolve();
    });
  }

  emitStartGame() {
    document.querySelector(".start-game-button").remove();
    document.querySelector("canvas").focus();
    let socket = this.socket;
    socket.emit('startGame');
  }
  
  loadGame() {
    return new Promise(resolve => {
      let socket = this.socket;
      socket.emit('loadGame');
      resolve();
    });
  }

  joinRoom() {
    return new Promise(resolve => {
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
    this.openSocket()
      .then(() => {
        this.joinRoom()
          .then(() => {
            this.loadGame();
          });
      });

    let socket = this.socket;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    document.body.onkeydown = function (e) {
      if (e.keyCode === 32) {
        socket.emit('pressSpace');
      }
    };

    this.drawObjects();
    requestAnimationFrame(this.drawObjects);
  }

  drawObjects() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DrawUtil._drawBackground(ctx);
    DrawUtil._drawPipes(ctx, this.pipes);
    DrawUtil._drawRoad(ctx);
    DrawUtil._drawItems(ctx, this.items);
    
    this.players.forEach(player => {
      DrawUtil._drawKart(ctx, player)
    })
    

    const currentUserID = this.props.location.userId;
    let currentUser;
    this.players.forEach(player => {if (player.id === currentUserID) currentUser = player});
    const x = currentUser ? currentUser.pos[0] : 0
    // const y = currentUser ? currentUser.pos[1] : 0

    const viewport = this.refs.viewport;
    const cam = viewport.getContext('2d');
    cam.clearRect(0, 0, viewport.width, viewport.height);
    cam.drawImage(canvas, x - viewport.width / 4, 0, viewport.width, viewport.height, 0, 0, viewport.width, viewport.height)
  }


  render() {
    if (!this.props) {
      return null;
    }

    return (
      <div>
        <div className='canvas-container'>
          {/* <audio src={backgroundMusic} autoPlay loop /> */}
          <canvas id='background' ref="canvas" width="10000" height="500" />
          <canvas id="viewport" ref="viewport" width="700" height="500" />   
        </div>
        {(this.state.hostId === this.props.currentUserId) ? 
        (<button 
            className='start-game-button input submit'
            onClick={this.emitStartGame}>Start Game
          </button>) : 
        (<div/>)}         
      </div>
    )
  }
}

export default Canvas;