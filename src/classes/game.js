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
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //

    for ( let i = 0; i < 8; i++){
      let randomLoc = Math.random() * ( 250*(i+1) - 250*i ) + 250*i;
      let randomHeight = Math.random() * (300 - 50 ) + 150;
      this.pipes.push(
        { location: randomLoc,
          width: 70,
          height: randomHeight });
    }
  } 

  

}

export default Game;