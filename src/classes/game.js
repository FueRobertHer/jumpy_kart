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
    this.playerInfoObject = {};

    //in game objects related
    this.pipes = [];
    this.coins = [];
    this.bananas = [];
    this.mushrooms = [];
    this.allItems = [];

    //to send down info on players and pipes and etc.
    this.update = this.update.bind(this);
    this.pipeObjcollide = this.pipeObjcollide.bind(this);
    this.playerPipeCollide = this.playerPipeCollide.bind(this);

    //to set game timer
    this.gameClock = 60000;

    // to record the order of players
    this.podium = [];
  }


  async loadGame(socket){
    this.placePipes(socket);
    this.placeItems(socket);
    this.allPresentItems(socket);
    this.emitUpdateGame(socket);
  }


////////////The Game Set up///////////////////////////////////

  addPlayer(playerId, socket, gameId){
    let startPos = [100, 200];
    let player = new Player(startPos, playerId, gameId);

    //fill out player info for game
    this.players[playerId] = player;
    console.log(this.players[playerId]);
    this.playerSockets[playerId] = socket;

    for (let i = 0; i < Object.values(this.players).length; i++) {
      const player = Object.values(this.players)[i];
      this.playerInfoObject[player.id] = {
        id: player.id,
        pos: player.pos,
      };
    }

    Object.values(this.playerSockets).forEach(socket => {
      socket.emit("playerJoined", {
        players: this.playerInfoObject
      });
    });
    
    console.log(this.playerInfoObject);
    return player;
  }

  placePipes(){
    //place a random pipe somewhere on the board: worked
    //place random pipes but make sure that they are minimum dist from each other
    //place a pipe per 250px width
    //
    if (this.pipes.length === 0) {
      for ( let i = 0; i < 13; i++){
        let randomXCoord = Math.random() * (250 * (i + 1) - 250 * i) + 700 * i + 1000;
        let randomHeight = Math.random() * (300 - 50) + 175;
        this.pipes.push(new Pipe(randomXCoord, 70, randomHeight));
      }
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

  gameloop(socket){
    // call the game setup function
    // the players should already be registered

    // start the race
    this.raceStart(socket);
    
    // the race finish logic
    // this should take the coins players earned and deposit them in backend
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    });
  }

  async raceStart(socket){
    //should call the update function
    while (this.gameClock > 0.5){
      console.log(this.gameClock);
      //check finish of race
      this.checkFinish();
      //subtract from gameClock
      this.gameClock -= (1000/50);
      this.update(socket);
      await this.sleep(1000/60);
    }
    
  }

  update(socket){
    //update the items currently on the map
    this.allPresentItems();

    Object.values(this.players).forEach(player => {
      let playerMoveArr = [];

      // for each player, calculate how much they should move by
      // move them by that much, while updating Player inst and
      // player info object

      // player and item collision
      // what is the benefit of 
      let didCollide = player.itemCollide(this.allItems[j]);
      if (didCollide === true) {
        this.allItems.splice(j, 1);
      }

    });
    

    //collision logic will take care of moving the player
    //bind this for update to this for game class??
    this.playerItemCollide();
    this.playerPipeCollide();
    this.emitUpdateGame(socket);
  }

  checkFinish(){
    //loop through players and see if their pos has crossed line
    Object.values(this.players).forEach(player => {
      if (player.pos[0] > 9900){
        this.podium.push([player.id, (60000 - this.gameClock)/1000 ]);
      } else if( (this.podium.length > 4) || this.gameClock < 0.2) {
        // run game ending logic raceEnd();
      } 
    })
  }

  raceEnd(){
    //run when all 4 player finish or timer runs out
  }
////////////////////////Collision Helper methods//////////////////

  allPresentItems(){
    this.allItems = [].concat(this.coins, this.bananas, this.mushrooms);
  }

  playerPipeCollide(){
    Object.keys(this.players).forEach(playerId => {
      this.pipes.forEach(pipe => {
        this.players[playerId].pipeCollide(pipe);
        this.playerInfoObject[playerId] = {
          id: playerId,
          pos: this.players[playerId].pos
        }
        console.log(this.playerInfoObject[playerId]);
      });
    });
  }

  playerItemCollide(){
    //loops over players and allItems
    Object.keys(this.players).forEach(playerId => {
      for (let j = this.allItems.length - 1; j >= 0; --j) {
        let didCollide = this.players[playerId].itemCollide(this.allItems[j]);
        //delete the item after collision
        if (didCollide === true){
          this.allItems.splice(j,1);
        }
      }
    });
  }


/////////////////////////Race End helper////////////////////////////

  gameTimeUp(){
    //see the positions of each player and assign rankings

  }


  

/////////////////////Emit Stuff/////////////////////////////////

  emitUpdateGame(socket) {
    
    //emit game setup
    // change out placePipes with game set up
    socket.emit("placeItems", {
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


    // this will emit the game state
    // such as player locations
    socket.emit("updateGameState", ({
      hostId: this.hostId,
      gameId: this.gameId,
      players: this.playerInfoObject
    }));

    //emit end game state
    
  }
  

}

export default Game;

//game should loop will call move, collision, fucntion each loop
//game class will call the loop. 
// game's move call will run move functions for all the players