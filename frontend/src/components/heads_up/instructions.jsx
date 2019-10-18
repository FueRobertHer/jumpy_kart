import React from "react";

import banana from "../../assets/images/banana.png";
import coin from "../../assets/images/coin.png";
import smallCoin from "../../assets/images/small_coin.png";
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
        <section className='instruction-enumerables'>
          <p>1) Press space bar to jump</p>
          <img className='spacebar-sprite' src={spacebar} alt='' />
          <p id='space-bar'>SPACE</p>
          <p>2) Mushrooms give you a boost</p>
          <img className='item-sprite' src={mushroom} alt='' />
          <p>3) Bananas slow you down</p>
          <img className='item-sprite' src={banana} alt='' />
          <p>4) Collect coins along the way</p>
          <img className='item-sprite' id='last-sprite' src={coin} alt='' />
        </section>
        <section className='race-coins'>
          <p>Finishing races also</p>
          <p className='placing-info'>scores you coins!</p>
          <span className='placing-span'>
            <p className='placing-info'>1st Place: 10 x</p>
            <img className='small-coin-sprite' src={smallCoin} alt='' />
          </span>
          <span className='placing-span'>
            <p className='placing-info'>2nd Place: 5 x</p>
            <img className='small-coin-sprite' src={smallCoin} alt='' />
          </span>
          <span className='placing-span'>
            <p className='placing-info'>3rd Place: 3 x</p>
            <img className='small-coin-sprite' src={smallCoin} alt='' />
          </span>
        </section>
        <section className='scoreboard-note'>
          <p>Collect coins to get your</p>
          <p>name on the scoreboard!</p>
        </section>
      </div>
    );
  }
}

export default Instructions;
