import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      roomId: "",
      username: props.currentUsername,
      userId: props.currentUserId
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.updateUsername = this.updateUsername.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let roomId;
    // if (this.state.username) {
    //   createRoom().then(res => {
    //     roomId = res.data.roomId
    //     this.props.history.push({
    //       pathname: `/game/${roomId}`,
    //       type: "createRoom",
    //       userId: this.state.userId,
    //       roomId: roomId,
    //       isHost: true
    //     });
    //   });
    //   this.props.closeModal();
    // }
  }

  render() {
    return (
      <div>
          <button className="join-button" onClick={() => this.props.openModal("joinRoom")}>
          </button>
        <form onSubmit={this.handleSubmit()}>
            Join Room
        </form>
      </div>
    )
  }
}

export default withRouter(CreateRoom)
