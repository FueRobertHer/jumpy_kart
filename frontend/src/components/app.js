import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import '../assets/stylesheets/reset.css';
import '../assets/stylesheets/navbar_footer.css';
import '../assets/stylesheets/signup_login_form.css';
import '../assets/stylesheets/app.css';
import '../assets/stylesheets/game.css';

import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import GameContainer from './game/game_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <NavBarContainer />

        <div className="parent">
          <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <ProtectedRoute exact path="/game" component={GameContainer} />
            <ProtectedRoute exact path="/game/:testRoom" component={GameContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
          </Switch>
        </div>

        <footer className="footer">
          Copyright &copy; 2019 Jumpy Kart
        </footer>
      </div>
    )
  }
};

export default App;