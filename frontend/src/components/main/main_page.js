import React from 'react';
import { Link } from 'react-router-dom'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <div className="main">
          <Link to="/login" ><h1 className="play">PLAY</h1></Link>
          {/* <h1>JUMPY KART</h1> */}
          
        </div>

        
      </div>
    );
  }
}

export default MainPage;