class Pipe {
  constructor(pos, width, height){
    this.pos = [pos, height];
    this.width = width;
    this.height = height;
    this.type = "pipe";
    //this assumes that the pos pixel coord of the center of the image
    this.corners = [
      pos,
      [pos[0] + width, pos[1]],
      [pos[0] + width, pos[1] + height],
      [pos[0], pos[1] + height]
    ];
  }
     
};

export default Pipe;
