import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';

import Game from './game';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps)(NavBar);