import React from 'react';
import { Link } from 'react-router-dom'

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time left
      // players
      // races left
      // gameStarted (from StarfighterPVP)
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#5C93FC"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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