import React from "react";

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='instructions-master'>
        <h2>GAME INSTRUCTIONS</h2>
        <p>1) Press space bar to jump</p>
        <p>2) Mushrooms give you a boost</p>
        <p>3) Bananas slow you down</p>
        <p>4) Coins get added to your account</p>
      </div>
    );
  }
}

export default Instructions;
