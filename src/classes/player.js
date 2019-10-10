//import pipes and power ups for collision detection

import Pipe from './pipe';

class Player {
  constructor(pos, id) {

    //position on map
    this.pos = pos;
    this.id = id;

    this.left = pos[0];
    this.top = pos[1];
    this.right = this.left + 55;
    this.bottom = this.top + 55;

    //speed    
    this.horiSpeed = 10;
    this.vertSpeed = 0;

    //gravity
    this.gravity = 5;
    
    //number of coins collected
    this.numCoin = 0;

    // finishing place
    this.finishPlace = 0;        
  }

  jump() {
    // changes the player position
    // does not rely move function
    console.log("jumping")
    if (this.pos[1] > 30){
      this.vertSpeed = -35;
    }
  }

  move() {
    //add gravity to vertSpeed
    this.vertSpeed += this.gravity;

    //add velocity to pos every frame
    this.pos[0] += this.horiSpeed;
    this.pos[1] += this.vertSpeed;

    // make sure the player doesnt fall off the map
    // make sure the jump func is run first so that vertSpeed is changed
    if (this.pos[1] > 425){
      this.pos[1] = 425;
      this.vertSpeed = 0;
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
    // side collision below top of pipe
    if ((playerX + 55 >= pipeX) && 
        (playerX < pipeX + 51))
    {
      //check for top collision
      if ((playerY + 55 - pipeY > -30) &&
        (playerY + 55 - pipeY < 4))
      {
        this.pos[1] = pipeY - 55;
        this.vertSpeed = 0;
        this.gravity = 0;   
      }
      else if ((playerY + 55 - pipeY > 1))
      {
        this.horiSpeed = 0;
      }
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
          this.pos[0] = this.pos[0] + 200;
          this.numCoin = this.numCoin + 1;
          console.log('this.numCoin', this.numCoin)
        case 'Mushroom':
          this.pos[0] = this.pos[0] + 200; // change once we change to velocity
          console.log('Mushroom')
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