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

    //to send down info on players and pipes and etc.
    this.update = this.update.bind(this);

    //to set game timer
    this.timer = 60;
  }


  async loadGame(socket){
    this.placePipes(socket);
    this.emitUpdateGame(socket);
  }


////////////The Game Set up///////////////////////////////////

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

    for ( let i = 0; i < 16; i++){
      let randomPos = Math.random() * (250 * (i + 1) - 250 * i) + 700 * i + 1000;
      let randomHeight = Math.random() * (300 - 50) + 175;
      this.pipes.push(new Pipe(randomPos, 70, randomHeight));
    }   
  } 

/////////////////Game Loop///////////////////////////////////////

  gameloop(){
    // call the game setup function
    // the players should already be registered


    // start the race
    this.raceStart();
    
    
    // the race finish logic
    // this should take the coins players earned and deposit them in backend

  }


  async raceStart(){
    //should call the update function
    let gameClock = 60;
    while (gameClock > 0){
      //subtract from gameClock
      gameClock -= .02;
      this.update();
      await sleep(1000/50);
    }
    
  }

  update(){
    

    //first check for any collisions
    //bind this for update to this for game class
    this.playerPipeCollide();

    //updates the game state by moving each of the players 
    
    Object.values(this.players).map(player => {
      player.move();
    })


  }

  raceEnd(){
    
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
  

/////////////////////Emit Stuff/////////////////////////////////

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

//game should loop will call move, collision, fucntion each loop
//game class will call the loop. 
// game's move call will run move functions for all the players