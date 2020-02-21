// props => <HUD players={this.state.players} />

import React from "react";

import MarioHead from "../../../assets/images/mario_head.png";
import PeachHead from "../../../assets/images/peach_head.png";
import ToadHead from "../../../assets/images/toad_head.png";
import YoshiHead from "../../../assets/images/yoshi_head.png";

export default function MobileHUD(props) {
  const playerInfo = {
    mario: undefined,
    peach: undefined,
    toad: undefined,
    yoshi: undefined
  };

  let mario = undefined;
  let peach = undefined;
  let toad = undefined;
  let yoshi = undefined;

  const spriteRef = {
    mario: MarioHead,
    peach: PeachHead,
    toad: ToadHead,
    yoshi: YoshiHead
  };

  function updateObjects() {
    props.players.forEach(player => {
      playerInfo[player.sprite] = player.pos[0];
    });
  }

  if (playerInfo === undefined) return <div />;

  updateObjects();

  return (
    <div className='mobile-hud-master'>
      <h2>PROGRESS TRACKER</h2>

      <div className='lists-div'>
        <ol className='sprite-list'>
          <li className='sprite-li'>
            <>
              <img src={playerInfo.mario ? spriteRef.mario : ""} alt='' />
            </>
          </li>
          <li className='sprite-li'>
            <>
              <img src={playerInfo.peach ? spriteRef.peach : ""} alt='' />
            </>
          </li>
          <li className='sprite-li'>
            <>
              <img src={playerInfo.toad ? spriteRef.toad : ""} alt='' />
            </>
          </li>
          <li className='sprite-li'>
            <>
              <img src={playerInfo.yoshi ? spriteRef.yoshi : ""} alt='' />
            </>
          </li>
        </ol>

        <ol className='mobile-bar-list'>
          <div className='bar-holder'>
            <div
              className='bar player-1'
              style={{
                width: playerInfo.mario ? (playerInfo.mario / 9500) * 395 : 0
              }}
            ></div>
          </div>
          <div className='bar-holder'>
            <div
              className='bar player-2'
              style={{
                width: playerInfo.peach ? (playerInfo.peach / 9500) * 395 : 0
              }}
            ></div>
          </div>
          <div className='bar-holder'>
            <div
              className='bar player-3'
              style={{
                width: playerInfo.toad ? (playerInfo.toad / 9500) * 395 : 0
              }}
            ></div>
          </div>
          <div className='bar-holder'>
            <div
              className='bar player-4'
              style={{
                width: playerInfo.yoshi ? (playerInfo.yoshi / 9500) * 395 : 0
              }}
            ></div>
          </div>
        </ol>
      </div>
    </div>
  );
}
