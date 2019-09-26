import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';

import Game from './game';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps)(Game);