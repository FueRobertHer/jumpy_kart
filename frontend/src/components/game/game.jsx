import React from 'react';
import { Link } from 'react-router-dom';
import { _drawKart } from '../kart/kart';
import kartSprite from "../../assets/images/mario_sprite.png";
// this kartSprite is actually being used! ^^

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time left
      players: {}
      // races left
      // gameStarted (from StarfighterPVP)
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#5C93FC"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    _drawKart(ctx);
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="900" height="300"/>
      </div>
    )
  }
}

export default Canvas;