import Pipe from "./pipe";
import Player from "./player";

import Coin from "./coin";
import Mushroom from "./mushroom";
import Banana from "./banana";

const BoardSize = ["500", "1500"];
const FPS = 60;

class Game {
  constructor(gameId, hostId) {
    this.hostId = hostId;
    this.gameId = gameId;
    this.players = {};
    this.playerSockets = {};
    this.playerInfoObject = {};

    this.pipes = [];
    this.coins = [];
    this.bananas = [];
    this.mushrooms = [];
    this.allItems = [];

    this.update = this.update.bind(this);

    this.gameClock = 60000;
    this.podium = [];
    this.gameOver = false;
  }

  loadGame(socket) {
    this.placePipes(socket);
    this.placeItems(socket);
    // this.allPresentItems(socket);
    this.emitUpdateGame(socket);
  }

  ////////////The Game Set up///////////////////////////////////

  addPlayer(playerId, socket, gameId) {
    let startPos = [175, 300];
    let player = new Player(startPos, playerId, gameId, socket);

    //fill out player info for game
    this.players[playerId] = player;
    this.playerSockets[playerId] = socket;

    const sprites = ["mario", "peach", "toad", "yoshi"];

    for (let i = 0; i < Object.values(this.players).length; i++) {
      const player = Object.values(this.players)[i];
      this.playerInfoObject[player.id] = {
        id: player.id,
        pos: player.pos,
        sprite: sprites[i]
      };
    }

    Object.values(this.playerSockets).forEach(socket => {
      socket.broadcast.emit("playerJoined", {
        hostId: this.hostId,
        gameId: this.gameId,
        players: this.playerInfoObject
      });
    });

    return player;
  }

  removePlayer(playerId) {
    delete this.players[playerId];
    delete this.playerSockets[playerId];
  }

  placePipes() {
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //
    if (this.pipes.length === 0) {
      for (let i = 0; i < 13; i++) {
        let randomXCoord =
          Math.random() * (250 * (i + 1) - 250 * i) + 650 * i + 500;
        let randomHeight = Math.random() * (300 - 50) + 175;
        this.pipes.push(new Pipe(randomXCoord, 70, randomHeight));
      }
    }
  }

  placeItems() {
    let itemTypes = ["coin", "mushroom", "banana"];

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 7; i++) {
        let objOverlap = true;

        while (objOverlap === true) {
          let randomPos = [
            Math.random() * (1000 * (i + 1) - 1000 * i) + 1000 * i + 500,
            Math.random() * (300 - 50) + 100
          ];
          if (this.pipeObjcollide(this.pipes, randomPos) === false) {
            objOverlap = false;

            if (itemTypes[j] === "coin") {
              this.coins.push(new Coin(randomPos));
            } else if (itemTypes[j] === "mushroom") {
              this.mushrooms.push(new Mushroom(randomPos));
            } else {
              this.bananas.push(new Banana(randomPos));
            }
          }
        }
      }
    }
  }

  pipeObjcollide(pipes, randomPos) {
    let collide = false;

    pipes.forEach(pipe => {
      if (
        randomPos[0] < pipe.pos[0] + pipe.width &&
        randomPos[0] + 28 > pipe.pos[0] &&
        randomPos[1] < pipe.pos[1] &&
        randomPos[1] + 28 > pipe.pos[1]
      ) {
        collide = true;
      }
    });
    return collide;
  }

  /////////////////Game Loop///////////////////////////////////////

  gameloop(socket) {
    // call the game setup function
    // the players should already be registered

    // start the race
    // await ???
    socket.broadcast.emit("triggerStart");
    this.raceStart(socket);

    // the race finish logic
    // this should take the coins players earned and deposit them in backend
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async raceStart(socket) {
    //should call the update function
    this.allPresentItems();
    while (this.gameClock > 0.5 && !this.gameOver) {
      // console.log(this.gameClock);
      //check finish of race
      this.checkFinish(socket); //can pass socket here
      //subtract from gameClock
      this.gameClock -= 1000 / 24;
      this.update(socket);
      await this.sleep(1000 / 24);
    }
  }

  update(socket) {
    Object.values(this.players).forEach(player => {
      if (player.pos[0] > 9600) {
        player.horiSpeed = 0;
      } else {
        if (player.horiSpeed < 10) player.horiSpeed += 1;
        if (player.horiSpeed > 10) player.horiSpeed -= 1;
        player.gravity = 5;
      }
      // for each player, calculate how much they should move by
      // move them by that much, while updating Player inst and
      // player info object

      for (let j = this.allItems.length - 1; j >= 0; --j) {
        let didCollide = player.itemCollide(this.allItems[j], socket);
        if (didCollide === true) {
          this.allItems.splice(j, 1);
        }
      }

      //player and pipe collision
      this.pipes.forEach(pipe => {
        player.pipeCollide(pipe);
      });

      // console.log(player.horiSpeed);
      // move the player
      player.move();

      // send back player info
      this.playerInfoObject[player.id] = {
        id: player.id,
        pos: player.pos,
        sprite: this.playerInfoObject[player.id].sprite
      };

      this.emitUpdateGame(socket);
    });
  }

  checkFinish(socket) {
    //can pass socket
    //loop through players and see if their pos has crossed line
    Object.values(this.players).forEach(player => {
      if (player.finishPlace === 0 && player.pos[0] > 9600) {
        this.podium.push([
          player.id,
          (60000 - this.gameClock) / 1000,
          this.playerInfoObject[player.id].sprite,
          player.numCoin
        ]);
        player.finishPlace = this.podium.length;
      } else if (
        this.podium.length === Object.keys(this.players).length ||
        this.podium.length > 3 ||
        this.gameClock < 70
      ) {
        this.raceEnd(socket); //can pass socket
        this.gameOver = true;
      }
    });
  }

  raceEnd(socket) {
    //can pass socket
    //loop through players and push to podium based on position if they are not finished
    let unfinished = [];
    Object.values(this.players).forEach(player => {
      if (player.finishPlace === 0) {
        this.podium.push([player.id, 60000]);
        player.finishPlace = "DNF";
      }
    });
    socket.broadcast.emit("gameRunning");
    // console.log(this.podium)
    socket.broadcast.emit(
      "raceEnd",
      this.podium.map(player => ({
        id: player[0],
        time: player[1],
        sprite: player[2],
        coins: player[3]
      }))
    );
    // Object.values(this.playerSockets).forEach(socket => {
    //   socket.emit('raceEnd', {
    //     podium: this.podium.map(player => ({
    //       playerId: player[0],
    //       playerTime: player[1],
    //       playerChar: player[2]
    //     }))
    //     // podium: this.podium.map(player => {
    //     //   console.log('podium player', player[0], player[1])
    //     //   return ({playerId: player[0],
    //     //   playerTime: player[1]})
    //     // })
    //   });
    // })
  }

  ////////////////////////Collision Helper methods//////////////////

  allPresentItems() {
    this.allItems = [].concat(this.coins, this.bananas, this.mushrooms);
  }

  /////////////////////////Race End helper////////////////////////////

  gameTimeUp() {
    //see the positions of each player and assign rankings
  }
  /////////////////////Emit Stuff/////////////////////////////////

  emitUpdateGame(socket) {
    socket.broadcast.emit("placeItems", {
      pipes: this.pipes.map(pipe => ({
        pos: pipe.pos,
        width: pipe.width,
        height: pipe.height
      })),
      items: this.allItems.map(item => ({
        pos: item.pos,
        type: item.type
      }))
    });

    // socket.emit("updateGameState", {
    //   hostId: this.hostId,
    //   gameId: this.gameId,
    //   players: this.playerInfoObject
    // });

    socket.broadcast.emit("updateGameState", {
      hostId: this.hostId,
      gameId: this.gameId,
      players: this.playerInfoObject
    });

    //emit end game state
  }
}

export default Game;

//game should loop will call move, collision, fucntion each loop
//game class will call the loop.
// game's move call will run move functions for all the players
