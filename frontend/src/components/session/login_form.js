import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../assets/stylesheets/errors.css'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentUser === true) {
    //   this.props.history.push('/game');
    // }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user).then(() => this.props.history.push('/game'));
  }

  // Render the session errors if there are any
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
        <h2>Log in</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <br />
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);