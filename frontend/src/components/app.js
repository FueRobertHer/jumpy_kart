import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/navbar_footer.css";
import "../assets/stylesheets/signup_login_form.css";
import "../assets/stylesheets/app.css";
import "../assets/stylesheets/game.css";
import "../assets/stylesheets/join_game.css";
import "../assets/stylesheets/podium.css";
import "../assets/stylesheets/high_score.css";
import "../assets/stylesheets/instructions.css";
import "../assets/stylesheets/hud.css";

import NavBarContainer from "./nav/navbar_container";
import MainPage from "./main/main_page";
import GameContainer from "./game/game_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import LobbyContainer from "./game/lobby_container";
import PodiumContainer from "./podium/podium_container";

class App extends React.Component {
  render() {
    return (
      <>
        <NavBarContainer />

        <div className='parent'>
          <Switch>
            <AuthRoute exact path='/' component={MainPage} />
            <ProtectedRoute exact path='/game' component={GameContainer} />
            <ProtectedRoute
              exact
              path='/game/:roomId'
              component={GameContainer}
            />
            <ProtectedRoute exact path='/lobby' component={LobbyContainer} />
            <ProtectedRoute exact path='/podium' component={PodiumContainer} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
          </Switch>
        </div>

        <footer className='footer'>Copyright &copy; 2019 Jumpy Kart</footer>
      </>
    );
  }
}

export default App;
