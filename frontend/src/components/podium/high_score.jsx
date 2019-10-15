import React from "react";
import { withRouter } from "react-router-dom";

class HighScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='high-score-master'>
        <div className='high-score-container'>
          <table className='high-score-list'>
            <tr className='high-score-header'>
              <th id='top-left' className='left-side'>Username</th>
              <th id='top-right' className='right-side'>Coins</th>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test1</td>
              <td className='right-side'>100</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test2</td>
              <td className='right-side'>90</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test3</td>
              <td className='right-side'>80</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test4</td>
              <td className='right-side'>70</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test5</td>
              <td className='right-side'>60</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test6</td>
              <td className='right-side'>50</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test7</td>
              <td className='right-side'>40</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test8</td>
              <td className='right-side'>30</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test9</td>
              <td className='right-side'>20</td>
            </tr>
            <tr className='high-score'>
              <td className='left-side'>test10</td>
              <td className='right-side'>10</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(HighScore);
