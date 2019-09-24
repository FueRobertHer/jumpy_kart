import React from 'react';
import { Link } from 'react-router-dom';
import marioSprite from '../../assets/images/mario_sprite.png';
import pipeSprite from '../../assets/images/pipes_sprite.png';
import { Pipe } from '../../classes/pipe';

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
    ctx.fillStyle = "#5C93FC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let mario = new Image();
    mario.src = marioSprite;
    mario.onload = () => {
      ctx.drawImage(mario, 100, 100);
    }
    let pipe = new Image();
    pipe.src = pipeSprite;
    pipe.onload = () => {
      ctx.drawImage(pipe, Pipe.width, 200);
    }
    // simulating pulling value from backend to set y-coordinate of pipe
  }

  drawObjects() {

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