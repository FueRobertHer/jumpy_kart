import React from "react";
import { withRouter } from "react-router-dom";
import Player from "./player";
import Mario from "../../assets/images/mario_finish.png";
import Peach from "../../assets/images/peach_finish.png";
import Toad from "../../assets/images/toad_finish.png";
import Yoshi from "../../assets/images/yoshi_finish.png";
import PodiumModal from "../modal/podium_modal";

import { updateCoins } from "../../util/user_api_util";

class Podium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.spriteIds = { mario: Mario, peach: Peach, toad: Toad, yoshi: Yoshi };
    this.socket = null;
    this.podium = this.props.history.location.podium;
    this.firstPlace = this.podium[0] || "";
    this.secondPlace = this.podium[1] || "";
    this.thirdPlace = this.podium[2] || "";
  }

  componentDidMount() {
    console.log("podium props", this.podium);
    this.podium.forEach(player => {
      console.log("player coins", player.coins);
      updateCoins(player).catch(err => {
        console.log(err);
      });
    });
  }

  render() {
    if (!this.firstPlace) return null;

    return (
      <div>
        <div className='background-div'>
          <PodiumModal />
          <div id='first-place' className='player-div'>
            <Player image={this.spriteIds[this.firstPlace.sprite]} />
          </div>
          <div id='second-place' className='player-div'>
            <Player image={this.spriteIds[this.secondPlace.sprite]} />
          </div>
          <div id='third-place' className='player-div'>
            <Player image={this.spriteIds[this.thirdPlace.sprite]} />
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
      </div>
    );
  }
}

export default withRouter(Podium);
