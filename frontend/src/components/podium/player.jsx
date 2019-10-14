import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props) return null;
    return (
      <div>
        <div className='player'>
          <img src={this.props.image} />
        </div>
      </div>
    );
  }
}

export default Player;
