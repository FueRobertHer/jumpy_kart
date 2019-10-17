import React from "react";
import { withRouter } from "react-router-dom";

class HighScoreListItem extends React.Component {
  render() {
    return (
        <tr className='high-score'>
          <td className='left-side'>{this.props.username}</td>
          <td className='right-side'>{this.props.coins}</td>
        </tr>
    );
  }
}

export default withRouter(HighScoreListItem);
