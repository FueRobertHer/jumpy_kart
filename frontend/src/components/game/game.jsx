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
      pipes: [],
      coins: [],
      bananas: [],
      mushrooms: [],
      items: []
    };
    this.drawObjects = this.drawObjects.bind(this);
    this.openSocket = this.openSocket.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.emitStartGame = this.emitStartGame.bind(this);
    this.socket = null;
    this.characters = ['mario', 'peach', 'toad', 'yoshi'];
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

  componentWillMount() {
    this.openSocket()
      .then(() => {
        this.joinRoom()
          .then(() => {
            this.loadGame()
          })
      })
  }

  componentDidMount() {
    let socket = this.socket;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    document.body.onkeydown = function (e) {
      if (e.keyCode === 32) {
        socket.emit('pressSpace');
      }
    }


    this.drawObjects();
    requestAnimationFrame(this.drawObjects);
  }



  drawObjects() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    DrawUtil._drawPipes(ctx, this.pipes)
    DrawUtil._drawItems(ctx, this.items) 
    
    this.players.forEach(player => {
      DrawUtil._drawKart(ctx, player)
    })
    
                 
    // if (Object.keys(this.players).length !== 0) {
      // DrawUtil._drawKart(ctx, 'mario', Object.values(this.players)[0].pos);
    //   for (let i = 0; i < Object.keys(that.players).length; i++) {
    //     remainingChars.push(i)
    //   }

    //   // for (let i = 0; i < Object.keys(this.players).length; i++) {
    //   //   const playerId = Object.keys(that.players)[i];
    //   //   if (playerId !== that.props.currentUserId) {
    //   //     DrawUtil._drawKart.apply(that, [ctx, that.characters[i], Object.values(that.players)[i].pos]);
    //   //     remainingChars.splice(i, 1);
    //   //   }
    //   // }

    //   DrawUtil._drawKart(ctx, this.characters[remainingChars[0]], Object.values(this.players)[remainingChars[0]].pos);
    // }
    // requestAnimationFrame(this.drawObjects);
  }

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <div className='canvas-container'>
        <canvas id='background' ref="canvas" width="10000" height="500" />
        {(this.state.hostId === this.props.currentUserId) ? 
         (<button className='start-game-button input submit'
                  onClick={this.emitStartGame}
          >Start Game</button>) : 
         (<div/>)}        
      </div>
    )
  }
}
export default Canvas;