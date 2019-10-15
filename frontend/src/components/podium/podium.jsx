import React from "react";
import { withRouter } from "react-router-dom";
import Player from "./player";
import Mario from "../../assets/images/mario_finish.png";
import Peach from "../../assets/images/peach_finish.png";
import Toad from "../../assets/images/toad_finish.png";
import Yoshi from "../../assets/images/yoshi_finish.png";
import PodiumModal from "../modal/podium_modal";

class Podium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.spriteIds = ["Mario", "Peach", "Toad", "Yoshi"];
    // this.podiumArr = (pass in podium array here)
  }

  render() {
    if (!this.props) return null;
    console.log(this.props);
    return (
      <div>
        <div className='background-div'>
          <PodiumModal />
          <div id='first-place' className='player-div'>
            <Player image={Mario} />
          </div>
          <div id='second-place' className='player-div'>
            <Player image={Peach} />
          </div>
          <div id='third-place' className='player-div'>
            <Player image={Toad} />
          </div>
        </div>

        <div className='button-container'>
          <button
            onClick={() => this.props.openModal("highScore")}
            className='join-button'
          >
            <p className='button-text'>View High Scores!</p>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Podium);
