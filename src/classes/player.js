//import pipes and power ups for collision detection

import Pipe from './pipe';

class Player {
  constructor(pos, id, gameId) {

    //position on map
    this.pos = pos;
    this.id = id;

    this.left = pos[0];
    this.top = pos[1];
    this.right = this.left + 55;
    this.bottom = this.top + 55;

    //speed    
    this.horiSpeed = 0;
    this.vertSpeed = 0;

    //gravity
    this.gravity = 5;
    
    //number of coins collected
    this.numCoin = 0;

    // finishing place
    this.finishPlace = 0;   
    
    this.jumped = false;
    this.doubleJumped = false;
  }

  jump(socket) {
    if (!this.jumped) {
      this.vertSpeed = -45;
      this.jumped = true;
    } else if (!this.doubleJumped) {
      this.vertSpeed = -40;
      this.doubleJumped = true;
    }

    socket.emit('jumpSound');
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
      this.jumped = false;
      this.doubleJumped = false;
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
      // if ((playerY + 55 - pipeY > -30) &&
      //   (playerY + 55 - pipeY < 4))
      if (pipeY > playerY && pipeY < playerY + 55) {
        if (playerY + 55 > pipeY) this.pos[1] = pipeY - 55;
        if (this.vertSpeed > 0) this.vertSpeed = 0;
        // this.gravity = 0;
        console.log("on pipe");
        
        this.doubleJumped = false;
      } else if ((playerY + 55 > pipeY)) {
        this.horiSpeed = 0;
      }
    }
  }

  itemCollide (item, socket) {
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let itemX = item.pos[0];
    let itemY = item.pos[1];

    let didCollide = true;

    if (
      (playerX < itemX + 27) &&
      (playerX + 55 > itemX) &&
      (playerY < itemY + 27) &&
      (playerY + 55 > itemY) 
    ) {
      if (item.type === "Coin") {
        socket.emit("coinSound");
        this.numCoin = this.numCoin + 1;
      } else if (item.type === "Mushroom") {
        socket.emit("mushroomSound");
        this.horiSpeed += 20;
      } else if (item.type === 'Banana') {
        this.horiSpeed -= 10;
      }
    } else {
      didCollide = false;
    }

    return didCollide;
  }
}

export default Player;