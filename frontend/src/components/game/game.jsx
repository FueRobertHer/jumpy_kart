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
    // this.players = ['5d8b9788267f8251c5872003', '5d8b978xxxxxxxxxxxxxxx03'];
    this.players = [];
    this.characters = ['mario', 'peach', 'toad', 'yoshi'];
    this.roomId = props.match.params.roomId;
    this.username = props.location.username;
    this.userId = props.location.userId;
    this.isHost = props.location.isHost;
  }

  openSocket() {
    this.socket = SERVER;
    let socket = this.socket;
    
    // socket.on('timer', (timestamp) => this.setState({
    //   time: timestamp
    // }));
    socket.emit('subscribeToTimer', 1000/60);

    socket.on('placePipes', data => {
      console.log('placing pipes');
      this.setState({
        loaded: true,
        pipes: data.pipes
      });
      // this.pipes = data.pipes
    });

    socket.on('updateGameState', data => {
      console.log("updating game state")
      this.setState({
        hostId: data.hostId,
        gameId: data.gameId,
      });
    });

    socket.on('playerJoined', data => {
      this.setState({
        players: data.players //data.players = {players: [{pos:[1,1], id: sometid}] }
      });
      this.players = data.players.map(player => (
        player.id
      ));
      console.log(data);
      console.log(this.state);
      console.log(this.players);
    });


  }


  loadGame() {
    this.socket = SERVER;
    let socket = this.socket;
    socket.emit('loadGame');
  }

  joinRoom() {
    this.socket = SERVER;
    let socket = this.socket;
    const roomInfo = {
      type: this.props.location.type,
      roomId: this.roomId,
      userId: this.userId,
      username: this.username
    };
    socket.emit('roomInfo', roomInfo);
  }

  componentDidMount() {
    this.openSocket();
    this.loadGame();
    this.joinRoom();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    console.log('only drawing background');
    this.drawBackground(ctx);
    // this.drawObjects(ctx);
    console.log('didmount')
    console.log(this.state.players)
    console.log(this.players);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loaded !== this.state.loaded) {
      console.log('drawing background and objects')
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      this.drawBackground(ctx);
      this.drawObjects(ctx);
      this.joinRoom();
      console.log('didupdate')
      console.log(this.players);
      console.log(this.state.players);
    }
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
    if (this.state.loaded) DrawUtil._drawPipes(ctx, this.state.pipes);
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