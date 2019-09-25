import Pipe from './pipe';
import Player from './player';

// import Pipe from './pipe';
const BoardSize = ["500", "1500"];
const FPS = 60;


class Game {
  constructor(gameId, hostId){
    this.hostId = hostId;
    this.gameId = gameId;
    this.pipes = [];
    this.players = {};
    this.playerSockets = {};
  }


  async loadGame(socket){
    this.placePipes(socket);
    this._emitUpdateGame(socket);
  }

  addPlayer(playerId, socket, gameId){
    let startPos = [100,100];
    let player = new Player(
      startPos,
      playerId
    )
    //fill out player info for game
    this.players[playerId] = player;
    this.playerSockets[playerId] = socket;
  }



  placePipes(){
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //

    for ( let i = 0; i < 4; i++){
      let randomPos = Math.random() * ( 250*(i+1) - 250*i ) + 250*i;
      let randomHeight = Math.random() * (500 - 50 ) + 50;
      this.pipes.push(new Pipe(randomPos, 70, randomHeight));
    }   

  } 

  playerPipeCollide(){
    //passes in players and pipes;
    //let player auto update their own stats.
    for (let i = 0; i < this.players.length; i++){
      for (let j = 0; j < this.pipes.length; j++){
        this.players[i].pipeCollide(this.pipes[j])
      }
    }
  }
  

  _emitUpdateGame(socket) {
    socket.emit("placePipes", {
      pipes: this.pipes.map(pipe => ({
        location: pipe.location,
        width: pipe.width,
        height: pipe.height
      }))
    });

    socket.emit("updateGameState", ({
      hostId: this.hostId,
      gameId: this.gameId,
      pipes: this.pipes
    }));
    
  }

  

}

export default Game;

//game should loop will call move, collision, fucntion each loop
//game class will call the loop. 
// game's move call will run move functions for all the players