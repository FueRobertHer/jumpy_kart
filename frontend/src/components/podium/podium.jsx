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
    this.spriteRef = { mario: Mario, peach: Peach, toad: Toad, yoshi: Yoshi };
    this.podium = this.props.history.location.podium;
    this.firstPlace = this.podium[0] || "";
    this.secondPlace = this.podium[1] || "";
    this.thirdPlace = this.podium[2] || "";

    this.backToLobby = this.backToLobby.bind(this);
  }

  componentDidMount() {
    this.podium.forEach(player => {
      updateCoins(player);
    });

    this.props.fetchHighScore();
  }

  backToLobby() {
    location.reload();
    this.props.history.push('/lobby');
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
          <button className='back-to-lobby-button'>
            <p className='high-scores-button-text'>Back to Lobby!</p>            
          </button> />
        </div>
      </div>
    );
  }
}

export default withRouter(Podium);
