import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../modal/modal';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUsername
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let roomId = Math.random().toString(36).slice(3, 8);
    this.props.history.push({
        pathname: `/game/${roomId}`,
        type: 'createRoom',
        userId: this.props.currentUserId,
        roomId: roomId,
        isHost: true,
        roomOwner: this.props.currentUserId
      })
  }

  render() {
    if (!this.props) return null;
    return (
      <div>
        {this.props.modal ? (
          <Modal />
        ) : (
          <div className="join-buttons-container">
            <div className='button-container'>
              <button onClick={this.handleSubmit} className='join-button'>
                <p className='button-text'>Create Game!</p>
              </button>
            </div>
            <div className='button-container'>
              <button onClick={() => this.props.openModal('joinRoom')} className='join-button'>
                <p className='button-text'>Join Game!</p>
              </button>
            </div>
          </div>
        )}
      </div>  
    );
  }
}

export default withRouter(Lobby);