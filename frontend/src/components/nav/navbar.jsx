import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { mobileCheck } from "../game/mobileDetectUtil";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.redirectToLobby = this.redirectToLobby.bind(this);
  }

  componentDidMount() {
    if (mobileCheck()) {
      const navbar = document.querySelector('.navbar');

      navbar.style.cssText = `
        width: 600px;
      `
    }
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  redirectToLobby() {
    this.props.history.push("/lobby");
    window.location.reload();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <button className='logout-btn home-button' onClick={this.logoutUser}>
            LOGOUT
          </button>
        </div>
      );
    } else {
      return (
        <div className='signup-login-holder'>
          <NavLink
            activeClassName='active'
            className='signup-login'
            to={"/signup"}
          >
            SIGNUP
          </NavLink>
          <NavLink
            activeClassName='active'
            className='signup-login'
            to={"/login"}
          >
            LOGIN
          </NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='navbar'>
        <button onClick={this.redirectToLobby}>
          <h1 className='home-button'>JUMPY KART</h1>
        </button>
        {this.getLinks()}
      </div>
    );
  }
}

export default withRouter(NavBar);
