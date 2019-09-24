// import Pipe from './pipe';


const BoardSize = ["500", "1500"];
const FPS = 60;



class Game {
  constructor(gameId, hostId){
    this.hostId = hostId;
    this.gameId = gameId;
    this.pipes = [];

  }

  async loadGame(){
    this.placePipes();
  }

  placePipes(){
    //place a random pipe somewhere on the board
    //push a pipe object in to pipe array
    // for ( let i = 0; i < 2; i++){
      this.pipes.push(
        {location: ['250']}
      )
    // }
  } 

}

export default Game;