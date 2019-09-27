import React from 'react';
import { withRouter } from 'react-router-dom';

class JoinRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: this.props.match.params.gameId || "",
      username: props.currentUsername,
      userId: props.currentUserId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.roomId !== "") {
      this.props.history.push({
        pathname: `/game/${this.state.roomId}`,
        type: 'joinRoom',
        username: this.state.username,
        userId: this.state.userId,
        roomId: this.state.roomId
      })
    }
  }
  
  render() {
    return (
      <div className='join-room-container'>
        <form className='join-room-form' onSubmit={this.handleSubmit}>
          <input
            className='input join-room-input'
            type="text"
            value={this.state.roomId}
            placeholder='Room ID'
            onChange={this.update('roomId')}
          />
          <button className="join-button input submit" type='submit'>
            Join Room
          </button>

        </form>
      </div>
    )
  }
}

export default withRouter(JoinRoom);
