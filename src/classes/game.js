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
    this.players = [];
  }


  async loadGame(socket){
    this.placePipes(socket);
    this._emitUpdateGame(socket);
  }

  placePipes(){
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //

    for ( let i = 0; i < 4; i++){
      let randomPos = Math.random() * ( 250*(i+1) - 250*i ) + 250*i;
      let randomHeight = Math.random() * (500 - 50 ) + 50;
      this.pipes.push(Pipe.new(randomPos, 70, randomHeight));
    }   

  } 

  playerPipeCollide(){
    
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