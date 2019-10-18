import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../assets/stylesheets/errors.css'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/game');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.signup(user, this.props.history)
      .then( () => this.props.login(user, this.props.history));
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li className="errors" key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <br />
            <input 
              className="input"
              type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="username"
            />
            <br />
            <input 
              className="input"
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="password"
            />
            <br />
            <input className="input submit login-button" type="submit" value="SIGN UP" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);