import React from 'react';
import { Link } from 'react-router-dom'

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-container">
        <div className="main">
          <div className='play-link-container'>
            <Link className='play-link' to="/login" >
              <div className='play-container'>
                <h1 className="play">PLAY</h1>
              </div>
            </Link>
          </div>
          <marquee className="marquee" direction="right" scrollamount="30">
            <p className="main-kart"></p>
          </marquee>
        </div>

      </div>
    );
  }
}

export default MainPage;