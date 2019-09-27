import Pipe from './pipe';
import Player from './player';

// import Pipe from './pipe';
const BoardSize = ["500", "1500"];
const FPS = 60;


class Game {
  constructor(gameId, hostId){

    //socket and player info related
    this.hostId = hostId;
    this.gameId = gameId;
    this.players = {};
    this.playerSockets = {};
    this.playerInfoObject = {};

    //in game objects related
    this.pipes = [];
    this.coins = [];
    this.bananas = [];
    this.muchrooms = [];

    //to send down info on players and pipes and etc.
    this.update = this.update.bind(this);
    this.pipeObjcollide = this.pipeObjcollide.bind(this);

    //to set game timer
    this.timer = 60;
  }


  async loadGame(socket){
    this.placePipes(socket);
    this.emitUpdateGame(socket);
  }


////////////The Game Set up///////////////////////////////////

  addPlayer(playerId, socket, gameId){
    let startPos = [200,200];
    let player = new Player(startPos, playerId);

    //fill out player info for game
    this.players[playerId] = player;
    this.playerSockets[playerId] = socket;

    for (let i = 0; i < Object.values(this.players).length; i++) {
      const player = Object.values(this.players)[i];
      this.playerInfoObject[player.id] = {
        id: player.id,
        pos: player.pos,
      }
    }

    Object.values(this.playerSockets).forEach(socket => {
      socket.emit("playerJoined", {
        players: this.playerInfoObject
      });
      // console.log('player was added')
      // console.log(this.players)
    });
  }

  placePipes(){
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //

    for ( let i = 0; i < 13; i++){
      let randomXCoord = Math.random() * (250 * (i + 1) - 250 * i) + 700 * i + 1000;
      let randomHeight = Math.random() * (300 - 50) + 175;
      let newPipe = new Pipe(randomXCoord, 70, randomHeight);
      console.log(newPipe.pos[0]);
      this.pipes.push(new Pipe(randomXCoord, 70, randomHeight));
    }   
  } 

  placeCoins(){
    // check if random position isnt next to pipes

    for (let i = 0; i < 3; i++) {
      
      //generate and check that random pos does not overlap with pipe
      let objOverlap = true;
      while (objOverlap === true){
        let randomPos = [
          Math.random() * (2500 * (i + 1) - 2500 * i) + 2500 * i + 1000,
          Math.random() * (300 - 50) + 100
        ];
        if ( this.pipeObjcollide(this.pipes, randomPos) === false ){
          objOverlap = false;
        }

      }
      
    }   
  }

  placeBananas(){

  }

  pipeObjcollide(pipes, randomPos){
    let collide = false;
    //get the coordinates covered by pipes
    pipes.forEach(pipe => {
      if (randomPos[0] < pipe.pos[0] + pipe.width &&
          randomPos[0] + 28 > pipe.pos[0] &&
          randomPos[1] < pipe.pos[1] &&
          randomPos[1] + 28 > pipe.pos[1]){
        collide = true;
      }
    });
    return collide;
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
      gameClock -= (1000/60);
      this.update();
      await sleep(1000/60);
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
    
    //emit game setup
    // change out placePipes with game set up
    socket.emit("placePipes", {
      pipes: this.pipes.map(pipe => ({
        pos: pipe.pos,
        width: pipe.width,
        height: pipe.height
      }))
    });


    // this will emit the game state
    // such as player locations
    socket.emit("updateGameState", ({
      hostId: this.hostId,
      gameId: this.gameId,
    }));

    //emit end game state
    
  }
  

}

export default Game;

//game should loop will call move, collision, fucntion each loop
//game class will call the loop. 
// game's move call will run move functions for all the players