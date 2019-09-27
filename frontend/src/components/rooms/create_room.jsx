import React from 'react';
import { withRouter } from 'react-router-dom';
import { createRoom } from '../../util/room_util';

class CreateRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      roomId: "",
      username: "",
      userId: props.currentUserId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateUsername = this.updateUsername.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let roomId;
    console.log('submitting create room')
    if (this.state.username) {
      createRoom().then(res => {
        roomId = res.data.roomId;
        this.props.history.push({
          pathname: `/game/${roomId}`,
          type: "createRoom",
          userId: this.state.userId,
          roomId: roomId,
          isHost: true
        });
      });
      this.props.closeModal();
    }
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  render() {
    return (
      <div>x
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            placeholder='username'
            onChange={this.update('username')}
          />

          <button className="join-button input submit" type='submit'>
            create Room
          </button>
          <button className="join-button" onClick={() => this.props.openModal("joinRoom")}>
            Join Room
        </button>
        </form>
        
      </div>
    )
  }
}

export default withRouter(CreateRoom)
