import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      roomId: "",
      username: props.currentUsername
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let roomId;

  }

  updateUsername(e) {
    this.setState({
      username: e.currentTarget.value
    });
  }


  render() {
    <div>
      <form onSubmit={this.handleSubmit()}>
        <input
          type="text"
          value={this.state.username}
          placeholder="Please enter your username"
          onChange={this.updateUsername()}
        />
        <button className="join-button">

        </button>
      </form>
    </div>
  }










}