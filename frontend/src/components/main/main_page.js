import React from 'react';
import { Link } from 'react-router-dom'

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-container">
        <div className="main">
          <Link to="/login" ><h1 className="play">PLAY</h1></Link>
          {/* <h1>JUMPY KART</h1> */}
          
        </div>

        <div>
          <marquee className="marquee" direction="right" scrollamount="30">
            <p className="main-kart"></p>
          </marquee>
        </div>
      </div>
    );
  }
}

export default MainPage;