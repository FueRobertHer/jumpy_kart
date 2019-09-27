import Pipe from './pipe';
import Player from './player';

//item imports
import Coin from './coin';
import Mushroom from './mushroom';
import Banana from './banana';



const BoardSize = ["500", "1500"];
const FPS = 60;


class Game {
  constructor(gameId, hostId){

    //socket and player info related
    this.hostId = hostId;
    this.gameId = gameId;
    this.players = {};
    this.playerSockets = {};

    //in game objects related
    this.pipes = [];
    this.coins = [];
    this.bananas = [];
    this.muchrooms = [];
    this.allItems = [];

    //to send down info on players and pipes and etc.
    this.update = this.update.bind(this);
    this.pipeObjcollide = this.pipeObjcollide.bind(this);
    this.playerPipeCollide = this.playerPipeCollide.bind(this);

    //to set game timer
    this.gameClock = 60;

    /
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
    Object.values(this.playerSockets).forEach(socket => {
      socket.emit("playerJoined", {
        players: Object.values(this.players).map(player => ({
          pos: player.pos,
          id: player.id
        }))
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

  placeItems(){
    // this function places coins, mushrooms, and bananas on the map
    // check if random position isnt next to pipes
    // then place the item
    let itemTypes = ['coin', 'mushroom', 'banana'];

    for(let j =0; j< 3; j++){
      for (let i = 0; i < 3; i++) {      
        let objOverlap = true;
        
        while (objOverlap === true){
          let randomPos = [
            Math.random() * (2500 * (i + 1) - 2500 * i) + 2500 * i + 1000,
            Math.random() * (300 - 50) + 100
          ];
          if ( this.pipeObjcollide(this.pipes, randomPos) === false ){
            objOverlap = false;
            // the item should be placed on map
            if(itemTypes[j] === 'coin'){
              this.coins.push(new Coin(randomPos));
            } else if (itemTypes[j] === 'mushroom'){
              this.mushrooms.push(new Mushroom(randomPos));
            } else{
              this.bananas.push(new Banana(randomPos));
            }
          }
        }       
      }  
    } 
  }

  pipeObjcollide(pipes, randomPos) {
    let collide = false;
    //get the coordinates covered by pipes
    pipes.forEach(pipe => {
      if (randomPos[0] < pipe.pos[0] + pipe.width &&
        randomPos[0] + 28 > pipe.pos[0] &&
        randomPos[1] < pipe.pos[1] &&
        randomPos[1] + 28 > pipe.pos[1]) {
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
    while (this.gameClock > 0){
      //subtract from gameClock
      this.gameClock -= (1000/50);
      this.update();
      await sleep(1000/60);
    }
    
  }

  update(){
    
    //update the items currently on the map
    this.allPresentItems();
    

    //first check for any collisions
    //bind this for update to this for game class
    this.playerPipeCollide();
    this.playerItemCollide();

    //updates the game state by moving each of the players 
    
    Object.values(this.players).map(player => {
      player.move();
    })
    
  }

  raceEnd(){
    //run when all 4 player finish or timer runs out
    
  }

////////////////////////Collision Helper methods//////////////////

  allPresentItems(){
    return [].concat(this.coins, this.bananas, this.mushrooms);
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

  playerItemCollide(){
    //loops over players and allItems
    for (let i = 0; i < this.players.length; i++) {
      for (let j = this.allItems.length; j >= 0; --j) {
        this.players[i].itemCollide(this.allItems[j])
        //delete the item after collision
        this.allItems.splice(j,1);
      }
    }
  }


/////////////////////////Race End helper////////////////////////////

  gameTimeUp(){
    //see the positions of each player and assign rankings

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