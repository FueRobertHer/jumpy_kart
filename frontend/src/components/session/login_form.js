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
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/lobby');
    }

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

    this.props.login(user) //.then(() => this.props.history.push('/lobby'));
  }

  handleDemo(e) {
    e.preventDefault();

    let demoUser = {
      username: "demo",
      password: "demo"
    }
    this.setState(demoUser);
    setTimeout(this.props.login(demoUser), 500);
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
            <input className="input submit login-button" type="submit" value="LOG IN" />
            <button onClick={this.handleDemo} className="input submit login-button">DEMO USER</button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);