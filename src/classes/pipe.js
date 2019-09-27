class Pipe {
  constructor(xCoord, width, height){
    this.pos = [xCoord, height];
    this.width = width;
    this.height = height;
    this.type = "pipe";
    //this assumes that the pos pixel coord of the center of the image
    
  }
     
};

export default Pipe;
