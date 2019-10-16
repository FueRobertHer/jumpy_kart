import React from "react";

import MarioHead from "../../assets/images/mario_head.png";
import PeachHead from "../../assets/images/peach_head.png";
import ToadHead from "../../assets/images/toad_head.png";
import YoshiHead from "../../assets/images/yoshi_head.png";

class HUD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.playerInfo = {
      mario: undefined,
      peach: undefined,
      toad: undefined,
      yoshi: undefined
    };
    this.mario = undefined;
    this.peach = undefined;
    this.toad = undefined;
    this.yoshi = undefined;
    this.spriteRef = {
      mario: MarioHead,
      peach: PeachHead,
      toad: ToadHead,
      yoshi: YoshiHead
    };
  }

  updateObjects() {
    this.props.players.forEach(player => {
      this.playerInfo[player.sprite] = player.pos[0];
    });
  }

  render() {
    if (this.playerInfo === undefined) return <div />;

    this.updateObjects();

    return (
      <div className='hud-master'>
        <h2>PROGRESS TRACKER</h2>

        <div className='lists-div'>
          <ol className='sprite-list'>
            <li className='sprite-li'>
              <div>
                <img src={this.playerInfo.mario ? this.spriteRef.mario : ""} />
              </div>
            </li>
            <li className='sprite-li'>
              <div>
                <img src={this.playerInfo.peach ? this.spriteRef.peach : ""} />
              </div>
            </li>
            <li className='sprite-li'>
              <div>
                <img src={this.playerInfo.toad ? this.spriteRef.toad : ""} />
              </div>
            </li>
            <li className='sprite-li'>
              <div>
                <img src={this.playerInfo.yoshi ? this.spriteRef.yoshi : ""} />
              </div>
            </li>
          </ol>

          <ol className='bar-list'>
            <div className='bar-holder'>
              <div
                className='bar player-1'
                style={{
                  width: this.playerInfo.mario
                    ? (this.playerInfo.mario / 9500) * 285
                    : 0
                }}
              ></div>
            </div>
            <div className='bar-holder'>
              <div
                className='bar player-2'
                style={{
                  width: this.playerInfo.peach
                    ? (this.playerInfo.peach / 9500) * 285
                    : 0
                }}
              ></div>
            </div>
            <div className='bar-holder'>
              <div
                className='bar player-3'
                style={{
                  width: this.playerInfo.toad
                    ? (this.playerInfo.toad / 9500) * 285
                    : 0
                }}
              ></div>
            </div>
            <div className='bar-holder'>
              <div
                className='bar player-4'
                style={{
                  width: this.playerInfo.yoshi
                    ? (this.playerInfo.yoshi / 9500) * 285
                    : 0
                }}
              ></div>
            </div>
          </ol>
        </div>
      </div>
    );
  }
}

export default HUD;
