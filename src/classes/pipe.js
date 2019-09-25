class Pipe {
  constructor(pos, width, height){
    this.pos = pos;
    this.width = width;
    this.height = height;
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
