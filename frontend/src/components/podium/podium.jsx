import React from "react";
import { withRouter } from "react-router-dom";
import Player from "./player";
import Mario from "../../assets/images/mario_finish.png";
import Peach from "../../assets/images/peach_finish.png";
import Toad from "../../assets/images/toad_finish.png";
import Yoshi from "../../assets/images/yoshi_finish.png";
import PodiumModal from "../modal/podium_modal";

import { updateCoins } from "../../util/user_api_util";
import { mobileCheck } from "../game/mobileDetectUtil";

class Podium extends React.Component {
  constructor(props) {
    super(props);
    this.spriteRef = { mario: Mario, peach: Peach, toad: Toad, yoshi: Yoshi };
    this.podium = this.props.history.location.podium;
    this.socket = this.props.history.location.socket;
    this.firstPlace = this.podium[0] || "";
    this.secondPlace = this.podium[1] || "";
    this.thirdPlace = this.podium[2] || "";

    this.backToLobby = this.backToLobby.bind(this);
  }

  componentDidMount() {
    for (let i = 0; i < this.podium.length; i++) {
      let player = this.podium[i];

      if (i === 0) player.coins += 10;
      if (i === 1) player.coins += 5;
      if (i === 2) player.coins += 3;

      updateCoins(player);
    }

    if (mobileCheck()) {
      const podiumMaster = document.querySelector(".podium-master");
      const backgroundDiv = document.querySelector(".background-div");

      podiumMaster.style.cssText = `
          width: 600px;
          overlflow: hidden;
        `;

      backgroundDiv.style.cssText = `
          margin-left: -210px;
        `;
    }

    this.props.fetchHighScore();
  }

  backToLobby() {
    this.props.history.push("/lobby");
    window.location.reload();
  }

  render() {
    if (!this.firstPlace) return null;

    return (
      <div className='podium-master'>
        <div className='background-div'>
          <PodiumModal />
          <div id='first-place' className='player-div'>
            <Player image={this.spriteRef[this.firstPlace.sprite]} />
          </div>
          <div id='second-place' className='player-div'>
            <Player image={this.spriteRef[this.secondPlace.sprite]} />
          </div>
          <div id='third-place' className='player-div'>
            <Player image={this.spriteRef[this.thirdPlace.sprite]} />
          </div>
        </div>

        <div className='button-container'>
          <button
            onClick={() => this.props.openModal("highScore")}
            className='high-scores-button'
          >
            <p className='high-scores-button-text'>View High Scores!</p>
          </button>
        </div>
        <div>
          <button
            className='back-to-lobby-button'
            onClick={() => this.backToLobby(this.socket)}
          >
            <p className='high-scores-button-text'>Back to Lobby!</p>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Podium);
