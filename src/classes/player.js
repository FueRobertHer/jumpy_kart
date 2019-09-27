//import pipes and power ups for collision detection

import Pipe from './pipe';


class Player {
  constructor(pos, id){

    //speed
    
    this.HoriSpeed = 2;
    this.Gravity = 2;
    
    this.pos = pos;
    this.id = id;
    //hitbox
    //the player is 56 by 56 px
    this.corners = [
      pos,
      [pos[0] + 55, pos[1]],
      [pos[0] + 55, pos[1] + 55],
      [pos[0], pos[1] + 55]
    ]
        
  }

  jump(){
    this.vertSpeed = 200;
  }

  move(){
    // add velocity to pos every frame
    // this.props.pos[0] + this.horiSpeed;
    // this.props.pos[1] + this.verSpeed;
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

}

export default Player;