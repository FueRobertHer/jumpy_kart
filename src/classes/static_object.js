export default class StaticObject {
  constructor(pos) {
    this.pos = pos;

    this.corners = {
      topLeft: pos,
      topRight: [pos[0] + 27, pos[1]], //top right
      botRight: [pos[0] + 27, pos[1] + 27], //bot right
      botLeft: [pos[0], pos[1] + 27], //bot left
    }
  }

}