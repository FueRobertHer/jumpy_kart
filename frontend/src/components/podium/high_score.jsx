import React from "react";
import { withRouter } from "react-router-dom";
import HighScoreListItem from "./high_score_list_item";

class HighScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.highScores = null;
  }

  componentDidMount() {
    this.highScores = this.props.fetchHighScore();
  }

  render() {
    if (!this.highScores) return null;

    const highScoreList = this.highScores.map(player => (
      <HighScoreListItem username={player.username} coins={player.coins} />
    ));

    return (
      <div className='high-score-master'>
        <div className='high-score-container'>
          <button className='close-button' onClick={this.props.closeModal}>
            <span>X</span>
          </button>
          <table className='high-score-list'>
            <tbody>
              <tr className='high-score-header'>
                <th id='top-left' className='left-side'>
                  Username
                </th>
                <th id='top-right' className='right-side'>
                  Coins
                </th>
              </tr>
              {highScoreList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(HighScore);
