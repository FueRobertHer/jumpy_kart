import React from "react";
import ambientAudio from "../../assets/audio/background_music.mp3";

class MuteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false
    };

    this.toggleAmbient = this.toggleAmbient.bind(this);
  }

  toggleAmbient() {
    const a = document.getElementById("ambient-music");
    const v = document.getElementById("viewport");
    a.muted = a.muted ? false : true;
    a.blur();
    v.focus();
    this.setState({ muted: a.muted });
  }

  render() {
    return (
      <div>
        <button className='mute-button' onClick={this.toggleAmbient}>
          {this.state.muted ? "Unmute" : "Mute"}
          <audio id='ambient-music' src={ambientAudio} autoPlay loop />
        </button>
      </div>
    );
  }
}

export default MuteButton;
