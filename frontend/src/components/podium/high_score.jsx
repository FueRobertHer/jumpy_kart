import React from "react";
import { withRouter } from "react-router-dom";
import HighScoreListItem from "./high_score_list_item";

class HighScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scores = [
      { username: "owen", coins: 10 },
      { username: "fue", coins: 9 },
      { username: "andrew", coins: 8 },
      { username: "taehoon", coins: 7 },
      { username: "ernie", coins: 6 },
      { username: "dolly", coins: 5 },
      { username: "obama", coins: 4 },
      { username: "abe_lincoln", coins: 3 },
      { username: "xX_L33T_g@m3r_Xx", coins: 2 },
      { username: "360noscope", coins: 1 }
    ];
  }

  componentDidMount() {
    this.props.fetchHighScore();
  }

  render() {
    const highScoreList = this.scores.map(player => (
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
