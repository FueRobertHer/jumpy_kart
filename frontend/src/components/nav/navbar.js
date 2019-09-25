import React from 'react';
import { Link, NavLink } from 'react-router-dom'
// import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div >
          <NavLink activeClassName="on-page" className="signup-login" to={'/signup'}>SIGNUP</NavLink>
          <NavLink activeClassName="on-page" className="signup-login" to={'/login'}>LOGIN</NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <h1>JUMPY KART</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;