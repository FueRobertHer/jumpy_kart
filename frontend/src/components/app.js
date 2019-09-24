import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');


class App extends React.Component {

  constructor(props) {
    super(props);

    this.sendSocketIO = this.sendSocketIO.bind(this);
  }
 

  sendSocketIO() {
    socket.emit('example_message', 'demo');
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>

        <div>
          <button onClick={this.sendSocketIO}></button>
        </div>
      </div>
    )
  }
};

export default App;