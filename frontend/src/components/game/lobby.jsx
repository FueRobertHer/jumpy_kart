import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
              <button onClick={() => this.props.openModal('createRoom')} className='join-button'>
                <p className='button-text'>Create Game!</p>
              </button>
            </div>
            <div className='button-container'>
              <button onClick={() => this.props.openModal('joinRoom')} className='join-button'>
                <p className='button-text'>Join Game!</p>
              </button>
            </div>
            {/* <div className='button-container'>
              <button onClick={() => this.props.openModal('demoRoom')} className='join-button'>
                <p className='button-text'>Demo Game!</p>
              </button>
            </div> */}
          </div>
        )}
      </div>  
    );
  }
}

export default withRouter(Lobby);