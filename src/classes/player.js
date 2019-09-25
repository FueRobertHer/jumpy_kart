//import pipes and power ups for collision detection

import Pipe from './pipe';


class Player {
  constructor(pos, id){

    //speed
    this.horiSpeed = 25;
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
  
    //set horizontal verlocity to zero when the radius is less than
    // the object radius plus some buffer
    // the game class will call this function for each player and each pipe
    // each pipe instance has corners method.

    this.horiSpeed = 0;


    // call the function that will reset the horispeed
  }

}

export default Player;