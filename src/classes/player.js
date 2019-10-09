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

    if ( (playerX + 55 >= pipeX) &&
         (playerY + 55 >= pipeY)
    ) {
      console.log("hit pipe?")
      this.horiSpeed = 0;
    }

  }

///////////////////////////// trying to update game state
///////////////////////////// with updated player pos

  itemCollide(item){
    //check what the item.type
    //return true or false to show collision
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let itemX = item.pos[0];
    let itemY = item.pos[1];


    let didCollide = true;

    if(
      (playerX < itemX + 28) &&
      (playerX + 56 > itemX) &&
      (playerY < itemY + 28) &&
      (playerY > itemY) 
    ){
      switch(item.type){
        case 'coin': 
          this.numCoin++;
        case 'mushroom':
          this.horiSpeed = 2;
        case 'banana':
          this.horiSpeed = 0.5;
        default:
          this.horiSpeed = 1;        
      }
    } else {
      didCollide = false;
    }

    return didCollide;
  }



}

export default Player;