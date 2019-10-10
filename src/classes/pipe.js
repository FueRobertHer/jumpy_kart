class Pipe {
  constructor(xCoord, width, height){
    this.pos = [xCoord, height];
    this.width = width;
    this.height = height;
    this.type = "pipe";
    //this assumes that the pos pixel coord of the center of the image
    
    this.top = this.pos[1];
    this.left = this.pos[0];
    // this.right = xCoord + width;
  }
     
};

export default Pipe;
