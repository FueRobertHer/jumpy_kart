import React from 'react';
import { Link } from 'react-router-dom'

class JoinGame extends React.Component {

  render() {
    return (
      <div className="join-buttons-container">
        <div className='button-container'>
          <button className='join-button'>
            <p className='button-text'>Create Game!</p>
          </button>
        </div>
        <div className='button-container'>
          <button className='join-button'>
            <p className='button-text'>Join Game!</p>
          </button>
        </div>
        <div className='button-container'>
          <button className='join-button'>
            <p className='button-text'>Demo Game!</p>
          </button>
        </div>
      </div>
    );
  }
}

export default JoinGame;