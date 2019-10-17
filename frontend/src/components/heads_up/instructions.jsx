import React from "react";

import banana from "../../assets/images/banana.png";
import coin from "../../assets/images/coin.png";
import mushroom from "../../assets/images/mushroom.png";
import spacebar from "../../assets/images/spacebar.png";

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='instructions-master'>
        <h2>GAME INSTRUCTIONS</h2>
        <div className='instruction-enumerables'>
          <p>1) Press space bar to jump</p>
          <img className='spacebar-sprite' src={spacebar} alt='' />
          <p id='space-bar'>SPACE</p>
          <p>2) Mushrooms give you a boost</p>
          <img className='item-sprite' src={mushroom} alt='' />
          <p>3) Bananas slow you down</p>
          <img className='item-sprite' src={banana} alt='' />
          <p>4) Collect coins along the way</p>
          <img className='item-sprite' src={coin} alt='' />
        </div>
      </div>
    );
  }
}

export default Instructions;
