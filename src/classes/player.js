//import pipes and power ups for collision detection

import Pipe from './pipe';


class Player {
  constructor(pos, id) {

    //position on map
    this.pos = pos;
    this.id = id;

    //speed    
    this.horiSpeed = 2;

    //gravity
    this.vertSpeed = 2;
    
    //number of coins collected
    this.numCoin = 0;

    // finishing place
    this.finishPlace = 0;        
  }

  jump() {
    // changes the player position
    // does not rely move function

    if (this.pos[1] > 30){
      this.pos[1] -= 120;
    }
  }

  move() {
    //add velocity to pos every frame
    this.pos[0] += this.horiSpeed;

    // make sure the player doesnt fall off the map
    // make sure the jump func is run first so that vertSpeed is changed
    if (this.pos[1] < 420){
      this.pos[1] += this.vertSpeed;
    }


  }

  pipeCollide(pipe) {  
    // set horizontal verlocity to zero when the obj corners overlap
    // the game class will call this function for each player and each pipe
    // each pipe instance has corners method.


    //player and pipe positions
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let pipeX = pipe.pos[0];
    let pipeY = pipe.pos[1];
    

    // check if player's x position is within range
    // then check if player's y pos

    // top collision (driving on pipe)
    if ((playerX + 55 >= pipeX) && (playerX < pipeX + 51) && (playerY + 55 - pipeY > 0) && (playerY + 55 - pipeY < 4)) { //  check to change later to = pipeY
      this.vertSpeed = 0;                                                                                   // ^^^ this vertical buffer has to change if gravity speed (constant) changes
    }
    // side collision below top of pipe
    else if ((playerX + 55 >= pipeX) && (playerX < pipeX + 51) && (playerY + 55 > pipeY)) {
      this.horiSpeed = 0;
    }
  }

  itemCollide(item){
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let itemX = item.pos[0];
    let itemY = item.pos[1];

    let didCollide = true;

    if(
      (playerX < itemX + 27) &&
      (playerX + 55 > itemX) &&
      (playerY < itemY + 27) &&
      (playerY + 55 > itemY) 
    ){
      console.log('item.type', item.type)
      switch(item.type){
        case 'Coin':
          this.pos[0] = this.pos[0] + 1000;
          this.numCoin = this.numCoin + 1;
          console.log('this.numCoin', this.numCoin)
        case 'Mushroom':
          this.pos[0] = this.pos[0] + 1000; // change once we change to velocity
        case 'Banana':
          this.pos[0] = this.pos[0] - 100;      
      }
    } else {
      didCollide = false;
    }

    return didCollide;
  }
}

export default Player;