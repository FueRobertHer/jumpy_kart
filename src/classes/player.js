class Player {
  constructor(pos, id){

    //speed
    this.horiSpeed = 25;
    this.verSpeed = 0;

    //hitbox
    this.hitbox = 23;

        
  }

  jump(){
    this.verSpeed = 200;
  }

  move(){
    // add velocity to pos every frame
    // this.props.pos[0] + this.horiSpeed;
    // this.props.pos[1] + this.verSpeed;


  }

  hasCollided(){
    //set horizontal verlocity to zero when the radius is lee than
    // the object lenght. 

  }

  

}