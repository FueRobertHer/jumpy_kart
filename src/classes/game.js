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
  }


  async loadGame(socket){
    this.placePipes(socket);
    this.emitUpdateGame(socket);
  }

  placePipes(){
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //

    for ( let i = 0; i < 16; i++){
      let randomPos = Math.random() * (250 * (i + 1) - 250 * i) + 700 * i + 1000;
      let randomHeight = Math.random() * (300 - 50) + 175;
      this.pipes.push(new Pipe(randomPos, 70, randomHeight));
    }   
  } 

  playerPipeCollide(){
    
  }
  

  emitUpdateGame(socket) {
    socket.emit("placePipes", {
      pipes: this.pipes.map(pipe => ({
        location: pipe.pos,
        width: pipe.width,
        height: pipe.height
      }))
    });

    socket.emit("updateGameState", ({
      hostId: this.hostId,
      gameId: this.gameId,
    }));
    
  }

  

}

export default Game;