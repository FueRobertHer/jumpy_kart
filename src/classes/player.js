//import pipes and power ups for collision detection

import Pipe from './pipe';


class Player {
  constructor(pos, id){

    //position on map
    this.pos = pos;
    this.id = id;

    //speed    
    this.HoriSpeed = 2;
    if (pos[1] > 490){
      this.Gravity = 0;
    }else {
      this.Gravity = 5;
    }
   
    
    //number of coins collected
    this.numCoin = 0;

    // finishing place
    this.finishPlace = 0;        
  }

  jump(input){
    console.log('jmping fuckers')
    if (input) {
      this.vertSpeed = -200;
    } else {
      this.speed = 0;
    }
  }

  move() {
    //add velocity to pos every frame

    this.props.pos[0] + this.horiSpeed;
    this.props.pos[1] + this.verSpeed;
  }

  pipeCollide(pipe){  
    //set horizontal verlocity to zero when the obj corners overlap
    // the game class will call this function for each player and each pipe
    // each pipe instance has corners method.


    //player and pipe positions
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let pipeX = pipe.pos[0];
    let pipeY = pipe.pos[1];


    //player and pipe side collision
    this.horiSpeed = 2;
    this.gravity = 2; 
    if( 
        playerX + 55 - pipeX < 1 &&
        playerY + 55 - pipeY < 2
      ){
      this.horiSpeed -= 2;
    } else if(
      (playerX + 55 - pipeX < 1) &&
      (playerY + 55 - pipeY > -1) &&
      (playerY + 55 - pipeY < 3)
    ){
      this.Gravity -= 2;
    }
  }

  itemCollide(item){
    //check what the item.type
    //return true or false to show collision
    let playerX = this.pos[0];
    let playerY = this.pos[1];
    let itemX = item.pos[0];
    let itemY = item.pos[1];

    this.horiSpeed = 2;
    this.gravity = 2; 

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
          this.HoriSpeed = 3;
        case 'banana':
          this.HoriSpeed = 1;
        default:
          this.HoriSpeed = 2;        
      }
    } else {
      didCollide = false;
    }

    return didCollide;
  }



}

export default Player;