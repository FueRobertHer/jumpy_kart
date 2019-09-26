//import pipes and power ups for collision detection

import Pipe from './pipe';


class Player {
  constructor(pos, id){

    //speed
    this.horiSpeed = 2;
    this.vertSpeed = 0;

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
    let x = this.pos[0];
    let y = this.pos[1];
    let pipeX = pipe.pos[0];
    let pipeY = pipe.pos[1];
    this.horiSpeed = 2;
    if( 
        x < pipeX+pipe.width && 
        x + 56 > pipeX && 
        y + 56 > pipeY && 
        y < pipeY+pipe.height){
      this.horiSpeed = 0;
    }
    // call the function that will reset the horispeed
  }

}

export default Player;