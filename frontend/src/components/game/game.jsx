import React from "react";
import io from "socket.io-client";
import * as DrawUtil from "./drawUtil";
import MuteButton from "./mute_button";
import coinSound from "../../assets/audio/coin.wav";
import mushroomSound from "../../assets/audio/mushroom.wav";
import bananaSound from "../../assets/audio/banana_slide.mp3";
import Instructions from "../heads_up/instructions";
import HUD from "../heads_up/hud";
import MobileHUD from "../heads_up/mobile/mobile_hud";
import { mobileCheck, mobileAndTabletCheck } from "./mobileDetectUtil";

let SERVER;
let conn_options = {
  "sync disconnect on unload": false
};

if (process.env.NODE_ENV !== "production") {
  // console.log(`process.env: ${process.env}`);
  SERVER = io("http://localhost:5000", conn_options, {
    transports: ["websocket"]
  });
}

if (process.env.NODE_ENV === "production") {
  // console.log(`process.env: ${process.env}`);
  SERVER = io();
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
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
    this.gameRunning = true;
    this.emitStartGame = this.emitStartGame.bind(this);
    this.gameRunningToggle = this.gameRunningToggle.bind(this);
    this.socket = null;
    this.characters = ["mario", "peach", "toad", "yoshi"];
    this.userNums = [];
    this.roomId = props.match.params.roomId;
    this.username = props.location.username;
    this.userId = props.location.userId;
    this.isHost = props.location.isHost;
    this.roomOwner = props.location.roomOwner;
    this.keyDown = false;
    this.pipes = [];
    this.items = [];
    this.podium = [];
    this.gameStartedYet = false;
  }

  openSocket() {
    return new Promise(resolve => {
      this.socket = SERVER;
      let socket = this.socket;

      socket.on("placeItems", data => {
        this.pipes = Object.values(data.pipes);
        this.items = Object.values(data.items);
      });

      socket.on("updateGameState", data => {
        this.setState({
          players: Object.values(data.players)
        });
      });

      socket.on("playerJoined", data => {
        if (this.gameRunning) {
          this.setState({
            hostId: data.hostId,
            gameId: data.gameId,
            players: Object.values(data.players)
          });
        }
      });

      socket.on("coinSound", () => {
        let coin = new Audio(coinSound);
        coin.volume = 0.25;
        coin.play();
      });

      socket.on("mushroomSound", () => {
        let mushroom = new Audio(mushroomSound);
        mushroom.volume = 0.25;
        mushroom.play();
      });

      socket.on("bananaSound", () => {
        let banana = new Audio(bananaSound);
        banana.volume = 1;
        banana.play();
      });

      socket.on("gameRunning", () => {
        this.gameRunning = false;
      });

      socket.on("raceEnd", data => {
        this.podium = this.podium.concat(data);
        this.props.history.push({
          pathname: "/podium",
          podium: this.podium,
          socket: socket
        });

        this.gameRunning = false;
      });

      resolve();
    });
  }

  emitStartGame() {
    document.querySelector(".start-game-button").remove();
    document.querySelector("canvas").focus();
    let socket = this.socket;
    socket.emit("startGame");
    let audio = document.querySelector("audio");
    audio.setAttribute("autoPlay", true);
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
      socket.emit("roomInfo", roomInfo);

      resolve();
    });
  }

  loadGame() {
    return new Promise(resolve => {
      let socket = this.socket;
      socket.emit("loadGame");
      resolve();
    });
  }

  gameRunningToggle() {
    this.gameRunning = false;
  }

  // to trigger jump button on mobile
  emitJump(socket) {
    // e.preventDefault();
    // let socket = this.socket;
    socket.emit("pressSpace");
  }

  componentDidMount() {
    window.onpopstate = e => {
      if (e.target.location.hash === "#/lobby") window.location.reload();
    };

    this.openSocket().then(() => {
      this.joinRoom().then(() => {
        this.loadGame();
      });
    });

    window.addEventListener("beforeunload", e => {
      this.gameRunningToggle();
    });

    let socket = this.socket;

    document.body.onkeydown = e => {
      if (e.keyCode === 32) {
        e.preventDefault();
        socket.emit("pressSpace");
      }
    };

    // insert mobile (only PHONE!) check here and create styles
    if (mobileAndTabletCheck()) {
      const html = document.querySelector("html");
      const appHolder = document.querySelector(".app-holder");
      const footer = document.querySelector("footer");
      const parent = document.querySelector(".parent");

      footer.style.visibility = "hidden";
      footer.style.width = "0px";

      appHolder.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
      `;

      parent.style.cssText = `
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      `;

      if (this.roomOwner === this.props.currentUserId) {
        const startGameButton = document.querySelector(".start-game-button");
        startGameButton.style.marginTop = "-270px";
        startGameButton.style.zIndex = "100";
      }

      // disables mobile double-touch zoom (also panning/scrolling)
      html.style.touchAction = "none";
    }

    this.drawObjects();
  }

  drawObjects() {
    requestAnimationFrame(this.drawObjects);
    if (this.gameRunning && this.refs.canvas) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");

      DrawUtil._drawBackground(ctx);
      DrawUtil._drawPipes(ctx, this.pipes);
      DrawUtil._drawRoad(ctx);
      DrawUtil._drawItems(ctx, this.items);

      let drawQueue = [];
      let currSprite = [];

      this.state.players.forEach(player => {
        if (player.id === this.props.currentUserId) {
          currSprite.push(player);
        } else {
          drawQueue.push(player);
        }
      });

      drawQueue = drawQueue.concat(currSprite);
      drawQueue.forEach(sprite => {
        DrawUtil._drawKart(ctx, sprite);
      });
      
      // get user id and find player with that id
      const currentUserID = this.props.location.userId;
      let currentUser;
      this.state.players.forEach(player => {
        if (player.id === currentUserID) currentUser = player;
      });

      // get x position of the player
      const x = currentUser ? currentUser.pos[0] : 0;

      // draw unique camera for each player
      const viewport = this.refs.viewport;
      const cam = viewport.getContext("2d");
      cam.clearRect(0, 0, viewport.width, viewport.height);
      cam.drawImage(
        canvas, // the full stage
        x - viewport.width / 4,
        0,
        viewport.width,
        viewport.height,
        0,
        0,
        viewport.width,
        viewport.height
      );
    } else {
      this.gameRunning = false;
    }
  }

  render() {
    if (!this.props) {
      return null;
    }

    return (
      <>
        <div className='game-master'>
          {mobileAndTabletCheck() ? (
            <></>
          ) : (
            <div className='instructions-div'>
              <Instructions />
            </div>
          )}
          <div className='game-ui'>
            <div className='canvas-container'>
              <canvas id='background' ref='canvas' width='10500' height='500' />
              <canvas id='viewport' ref='viewport' width='600' height='500' />
            </div>
            <div className='room-id-div'>
              <h3 className='room-id'>Room ID: {this.roomId}</h3>
            </div>
            {this.roomOwner === this.props.currentUserId ? (
              <button
                className='input submit login-button start-game-button'
                onClick={this.emitStartGame}
              >
                START GAME
              </button>
            ) : (
              <div />
            )}
            <>
              <MuteButton
                muted={this.muted}
                toggleAmbient={this.toggleAmbient}
              />
            </>
          </div>
          {mobileAndTabletCheck() ? (
            <></>
          ) : (
            <div className='hud-div'>
              <HUD players={this.state.players} />
            </div>
          )}
        </div>
        {mobileAndTabletCheck() ? (
          <MobileHUD players={this.state.players} />
        ) : (
          <></>
        )}
        {mobileAndTabletCheck() ? (
          <button
            className='input submit login-button mobile-jump-button'
            onClick={() => this.emitJump(this.socket)}
          >
            JUMP
          </button>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Canvas;
